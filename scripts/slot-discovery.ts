/**
 * Discover image slots in both v1 and v2 prototype HTML files, expand them into
 * a single manifest of { slot, variant, basePrompt, size } records consumable
 * by generate-images.ts.
 *
 * v1 source: public/v1/index.html — uses JSX <CinematicSlot label="IMG-HERO · …">.
 *            The eco section maps n=1..8 to render IMG-ECO-1 .. IMG-ECO-8.
 * v2 source: public/v2/index.html — uses [data-img-slot="hero"] (or data-image-slot)
 *            attributes injected by the unpack step. Slots discovered live from DOM.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

export type Aspect = '16:9' | '4:5' | '4:3' | '3:4' | '21:9' | '3:1' | '1:1';
export type ImageSize = '1024x1024' | '1536x1024' | '1024x1536';

export type Slot = {
  slot: string;
  variant: 'v1' | 'v2';
  aspect: Aspect;
  size: ImageSize;
  alt: string;
  basePrompt: string;
};

// Slot ID → base prompt + alt + aspect. Source of truth for the editorial brief.
// Slot IDs use the lowercased prefix of the CinematicSlot label (before the "·").
const V1_PROMPTS: Record<string, Omit<Slot, 'slot' | 'variant'>> = {
  'img-hero': {
    aspect: '16:9', size: '1536x1024',
    alt: 'A dressing room at golden hour, two open wardrobes with neatly hung neutral garments, a single empty wooden hanger catching warm light',
    basePrompt: 'Interior of a softly lit dressing room at golden hour. Two open wardrobes with neatly hung neutral-toned garments in cream, sage, and bone. A single empty wooden hanger catches the light. Dust motes drift in a beam of warm sun. Shallow depth of field. No people. The room feels paused — between something just put away and something about to be chosen.'
  },
  'img-about': {
    aspect: '16:9', size: '1536x1024',
    alt: "A stylist's hands gently smoothing a folded cashmere knit on a linen-covered table",
    basePrompt: "Close-up of a stylist's hands gently smoothing a folded cashmere knit on a linen-covered table. Side light from a north-facing window. The texture of the knit and the lines of folded edges visible. No faces. Documentary-editorial."
  },
  'img-canvas': {
    aspect: '4:5', size: '1024x1536',
    alt: 'Birds-eye view of an open wardrobe rail with twelve garments graduated from light bone to deep moss green',
    basePrompt: "Birds-eye flat-lay of a single open wardrobe rail photographed in studio light. Twelve garments hung evenly spaced from light bone to deep moss green. Every garment slightly different in texture — silk, linen, wool, cotton. The floor below shows a thin tag and a measuring tape. Ultra clean composition. The wardrobe as a system. Archival catalogue energy. No people."
  },
  'img-eco-1': {
    aspect: '4:3', size: '1536x1024',
    alt: 'An overstuffed closet, garments crammed on hangers, the feeling of decision fatigue',
    basePrompt: 'An overstuffed closet shot from the front, garments crammed on hangers in chaotic colours and textures, a sliver of warm bedside light spilling onto the floor. Slightly out of focus. Documentary realism. The feeling of decision fatigue. No people.'
  },
  'img-eco-2': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A hand holding a phone showing a soft sage-cream interface, window light',
    basePrompt: 'Detail shot of a hand holding a phone showing a soft sage-cream interface. The phone reflects light from a window with houseplants in the background. The screen is intentionally abstract — no readable UI. Shallow depth of field. Calm morning mood. No faces.'
  },
  'img-eco-3': {
    aspect: '4:3', size: '1536x1024',
    alt: 'An archivist session in progress, a clothing rail next to a portable lightbox and tripod',
    basePrompt: 'A home visit in progress: an open clothing rail next to a small portable lightbox, a tripod, a tablet on a stool, early evening light falling through a window onto a wooden floor. No people. Documentary still-life of the kit at work.'
  },
  'img-eco-4': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A phone showing a grid of garment thumbnails on a sage-cream interface, on a linen tablecloth',
    basePrompt: 'Top-down view of a phone screen showing a grid of garment thumbnails on a sage-cream interface. The phone sits on a linen tablecloth next to a folded scarf and a small green ceramic mug. Soft natural daylight. Calm and orderly. No UI text legible.'
  },
  'img-eco-5': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A navy blazer on a hanger against a cream backdrop, a tape measure on the floor, a notebook with a pencil',
    basePrompt: 'A simple still-life: a navy blazer on a hanger against a cream paper backdrop, a tape measure curling on the floor, a notebook with a pencil resting on top. Side daylight. Editorial product-photography style. Quiet and analytical. No people.'
  },
  'img-eco-6': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Two pairs of hands across a wooden table, one holding a phone, the other gesturing toward it',
    basePrompt: 'Two pairs of hands across a wooden table, one holding a phone showing a soft interface, the other gesturing toward it. Warm afternoon light. A ceramic cup of tea slightly out of focus in the foreground. Intimate teaching moment. No faces.'
  },
  'img-eco-7': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Three pieces on a sage paper sheet: a linen shirt, folded wool trousers, a leather wallet',
    basePrompt: 'A flat-lay of three pieces on a sage paper sheet: a single linen shirt, a pair of folded wool trousers, and a leather wallet. Photographed top-down in soft daylight. A small handwritten note tucked into one corner. Curated and restrained. No logos.'
  },
  'img-eco-8': {
    aspect: '4:3', size: '1536x1024',
    alt: 'An outfit laid out on a bed at sunrise: cream shirt, dark trousers, slim belt, watch',
    basePrompt: 'An outfit laid out on a made bed at sunrise: a cream shirt, dark trousers, a slim belt, and a watch. Gentle peach light from a window. No people. The feeling of waking up to a decision already made.'
  },
  'img-pricing': {
    aspect: '21:9', size: '1536x1024',
    alt: 'A tidy horizontal stack of folded garments in graduated tones from bone to forest green',
    basePrompt: 'A long horizontal still-life: a tidy stack of folded garments in graduated tones from bone to forest green, evenly lit, on a long linen runner against a sage-cream wall. Restrained composition with negative space on either side. Banner-like.'
  },
  'img-reserve': {
    aspect: '3:1', size: '1536x1024',
    alt: 'A single hand gently sliding a wooden hanger along a brass rail, motion blur',
    basePrompt: 'A single hand gently sliding a wooden hanger along a brass rail, captured mid-motion. The rest of the rail is empty. Side daylight. Slight motion blur on the hanger. Neutral palette of sage, brass, and bone. No face visible. Cinematic and quiet.'
  }
};

// v2 prompts mirror the brief's stylist-led manifest. Slot IDs match
// data-img-slot attributes injected into the unpacked v2 prototype.
const V2_PROMPTS: Record<string, Omit<Slot, 'slot' | 'variant'>> = {
  'hero-bg': {
    aspect: '16:9', size: '1536x1024',
    alt: 'A young woman in profile near a tall window in a quiet Mumbai apartment, half-lit by warm afternoon light',
    basePrompt: "A young Indian woman in her late 20s standing in profile near a tall window in a quiet Mumbai apartment, half-lit by warm late-afternoon light. She wears a relaxed cream linen shirt and tailored olive trousers, one hand loosely tucked into her pocket. Behind her, an open wooden wardrobe is barely visible in deep shadow. Sheer curtains diffuse the light, casting long soft beams across the floor. The moment just before getting dressed for the day. Shallow depth of field."
  },
  'pillar-01': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Overhead flat-lay of a meticulously organised wardrobe with 12 garments folded and spaced on warm oak',
    basePrompt: 'Overhead flat-lay of a meticulously organised wardrobe: 12 garments folded and spaced on warm oak, two pairs of shoes, a single brass hanger, a phone resting beside them showing a faint grid UI (blurred, no text). Top-down shot. Soft directional light from the right. Cream linen backdrop. Archival, calm.'
  },
  'pillar-02': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Close-up of an Indian stylist writing in a leather notebook',
    basePrompt: 'Close-up portrait of an Indian stylist (30s, short hair, oversized cream shirt) writing in a leather notebook. Soft focus on her hands and the page. A garment rack blurred in the background. Warm tungsten light. Half-shadow on her face. Documentary fashion editorial.'
  },
  'pillar-03': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A hand holding a phone in landscape against a soft sage-green linen background, abstract UI',
    basePrompt: 'A hand holding a phone in landscape orientation against a soft sage-green linen background. The phone screen is intentionally indistinct — abstract shapes suggesting outfit cards in cream, black and olive tones. Cinematic shallow depth of field. Single warm key light. No legible UI, no text.'
  },
  'eco-step-01': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Open wardrobe overstuffed with clothes, a sense of decision fatigue',
    basePrompt: 'Open wardrobe shot from inside the room: clothes overstuffed onto hangers, a slumped pile on the floor, one shoe lying sideways. Cold morning light, slightly desaturated. A quiet sense of overwhelm.'
  },
  'eco-step-02': {
    aspect: '4:3', size: '1536x1024',
    alt: "A young Indian woman's hands holding a phone, brass earring catching highlight",
    basePrompt: "Close crop of a young Indian woman's hands holding a phone (screen blurred, no UI). Saved Instagram posts implied as a soft mood-board glow on her face. Warm dusk window light. Brass earring catching highlight."
  },
  'eco-step-03': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A stylist crouched beside a wooden wardrobe, lifting a folded sari while a phone on a tripod photographs it',
    basePrompt: 'A stylist (mid-30s, cream linen shirt) crouched beside a wooden wardrobe, gently lifting a folded sari while a phone on a small tripod photographs it. Soft daylight. Terracotta floor. Intimate documentary tone.'
  },
  'eco-step-04': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Overhead flat-lay of twelve garments precisely spaced on warm oak, color-graded from cream to olive to charcoal',
    basePrompt: 'Overhead flat-lay: twelve garments precisely spaced on warm oak, color-graded from cream to olive to charcoal. Two folded shirts, one belt, one pair of loafers. Archival, calm.'
  },
  'eco-step-05': {
    aspect: '4:3', size: '1536x1024',
    alt: 'Three blurred portrait silhouettes hanging like polaroids on a single string against a sage wall',
    basePrompt: "Three blurred portrait silhouettes hanging like polaroids on a single string against a sage wall — one in focus (a stylist's face half-visible), the others soft. Warm gallery light."
  },
  'eco-step-06': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A stylist and client on a low cream sofa, mid-conversation, a notebook and folded shirt between them',
    basePrompt: 'A stylist and client sitting opposite each other on a low cream sofa, mid-conversation. A notebook and a folded shirt on the coffee table between them. Window light from the side. Both faces half-shadowed. Quiet, considered.'
  },
  'eco-step-07': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A woman from behind, slipping on a sage linen shirt in front of a mirror in morning light',
    basePrompt: 'A woman from behind, slipping on a sage linen shirt in front of a mirror in soft morning light. Bed in the background. A folded outfit waiting on it. Calm, ritualistic.'
  },
  'eco-step-08': {
    aspect: '4:3', size: '1536x1024',
    alt: 'A hand reaching toward an olive cotton blazer hanging on a wooden hook against a cream wall',
    basePrompt: 'A hand reaching toward a single garment hanging on a wooden hook against a cream wall — an olive cotton blazer, perfectly pressed. Single hard window light casting a long shadow. Editorial, intentional.'
  },
  'mode-chat': {
    aspect: '3:4', size: '1024x1536',
    alt: "A young Indian woman's hand holding a phone, chat bubble silhouette, marble café table",
    basePrompt: "A phone held in a young Indian woman's hand, screen facing the camera in soft focus — only the silhouette of a chat bubble layout is visible, no readable text. She is sitting at a small marble café table with a cortado beside her. Bokeh background of warm interior lights."
  },
  'mode-voice': {
    aspect: '3:4', size: '1024x1536',
    alt: 'An Indian man in his early 30s on a voice call, phone loosely to his ear, half a garment visible in soft focus',
    basePrompt: 'Close-up of an Indian man in his early 30s (cream shirt, unshaven) on a voice call. Phone pressed loosely to his ear, eyes looking slightly off-camera as he listens. Standing in front of an open wardrobe, half a garment visible in soft focus. Single warm side light. Deep shadows. Cinematic, contemplative.'
  },
  'mode-video': {
    aspect: '3:4', size: '1024x1536',
    alt: 'A woman in front of a bedroom mirror, holding her phone in landscape video-call orientation, mid-outfit-change',
    basePrompt: 'A woman in her late 20s standing in front of a tall bedroom mirror, holding her phone in landscape video-call orientation in front of her — the phone shows a soft glow but no legible interface. She is mid-outfit-change, wearing a slip dress, a blazer on the bed behind her. Warm dressing-room light. Calm, private.'
  }
};

function v1Slots(): Slot[] {
  return Object.entries(V1_PROMPTS).map(([slot, meta]) => ({ slot, variant: 'v1' as const, ...meta }));
}

function v2Slots(): Slot[] {
  return Object.entries(V2_PROMPTS).map(([slot, meta]) => ({ slot, variant: 'v2' as const, ...meta }));
}

export function getAllSlots(): Slot[] {
  return [...v1Slots(), ...v2Slots()];
}

// Optional: verify that every prompt has a matching placeholder in its HTML, so we don't
// silently generate orphan images. Only runs when called directly.
export async function verifyAgainstHtml(): Promise<{ orphans: string[]; missing: string[] }> {
  const v1Path = path.resolve(process.cwd(), 'public/v1/index.html');
  const v2Path = path.resolve(process.cwd(), 'public/v2/index.html');

  const v1Html = await fs.readFile(v1Path, 'utf8').catch(() => '');
  const v2Html = await fs.readFile(v2Path, 'utf8').catch(() => '');

  const orphans: string[] = [];
  const missing: string[] = [];

  // v1: extract every CinematicSlot label and reduce to slot IDs the same way the patched component does.
  const v1Labels = Array.from(v1Html.matchAll(/CinematicSlot[^>]*label=(?:"([^"]+)"|\{[^}]*'([^']+)'[^}]*\}|\{[^}]*"([^"]+)"[^}]*\})/g))
    .map((m) => m[1] || m[2] || m[3])
    .filter(Boolean) as string[];
  // Eco section uses a literal-template label: 'IMG-ECO-' + n. Materialise n=1..8.
  const v1Ids = new Set<string>();
  for (const lbl of v1Labels) {
    if (/IMG-ECO-/.test(lbl) || /'IMG-ECO-'/.test(lbl)) {
      for (let n = 1; n <= 8; n++) v1Ids.add('img-eco-' + n);
    } else {
      v1Ids.add(lbl.split('·')[0].trim().toLowerCase().replace(/\s+/g, '-'));
    }
  }
  for (const id of Object.keys(V1_PROMPTS)) if (!v1Ids.has(id)) orphans.push('v1/' + id);
  for (const id of v1Ids) if (!(id in V1_PROMPTS)) missing.push('v1/' + id);

  // v2: data-img-slot="..." attributes. The unpacked template should include these where
  // image placeholders existed. If the template has no annotations yet, this just reports
  // the manifest entries as "orphans" so the operator knows to add slot markers.
  const v2Ids = new Set(
    Array.from(v2Html.matchAll(/data-(?:img|image)-slot="([^"]+)"/gi)).map((m) =>
      m[1].toLowerCase().trim().replace(/\s+/g, '-')
    )
  );
  for (const id of Object.keys(V2_PROMPTS)) if (!v2Ids.has(id)) orphans.push('v2/' + id);
  for (const id of v2Ids) if (!(id in V2_PROMPTS)) missing.push('v2/' + id);

  return { orphans, missing };
}

if (require.main === module) {
  verifyAgainstHtml().then((r) => {
    console.log('Total slots: ' + getAllSlots().length);
    console.log('Manifest entries with no matching placeholder (orphans):', r.orphans);
    console.log('Placeholders with no manifest entry (missing prompts):', r.missing);
  });
}
