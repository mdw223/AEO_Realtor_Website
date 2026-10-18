import { triangleAreas } from "@/data/triangle-areas";
import { listingsSearchUrl } from "@/lib/site-config";

const fills = ["#4e5156", "#5d6166", "#6d7176", "#45484d", "#7c8085", "#3e4146"];

const boxes: Record<string, [number, number, number, number, number]> = {
  creedmoor: [310, 28, 110, 72, 14],
  youngsville: [430, 18, 100, 68, 12],
  franklinton: [540, 18, 120, 70, 14],
  louisburg: [670, 16, 145, 78, 16],
  hillsborough: [145, 108, 150, 96, 16],
  "wake-forest": [430, 98, 145, 88, 14],
  rolesville: [585, 100, 125, 82, 14],
  zebulon: [810, 78, 145, 96, 16],
  mebane: [18, 188, 112, 108, 14],
  durham: [145, 214, 185, 132, 18],
  morrisville: [342, 210, 108, 92, 12],
  raleigh: [462, 198, 185, 148, 18],
  knightdale: [658, 196, 125, 108, 14],
  wendell: [794, 186, 160, 118, 16],
  "chapel-hill": [28, 312, 155, 128, 16],
  cary: [198, 358, 155, 112, 16],
  garner: [462, 358, 155, 108, 14],
  clayton: [628, 318, 150, 112, 16],
  pittsboro: [18, 452, 145, 108, 14],
  apex: [198, 482, 155, 100, 14],
  "fuquay-varina": [368, 482, 175, 112, 16],
  smithfield: [558, 446, 185, 140, 18],
  sanford: [18, 574, 150, 112, 14],
  "holly-springs": [180, 594, 165, 96, 14],
  angier: [360, 608, 150, 86, 12],
};

function polygon(box: [number, number, number, number, number]) {
  const [x, y, w, h, c] = box;
  return [
    `${x + c},${y}`,
    `${x + w - c},${y}`,
    `${x + w},${y + c}`,
    `${x + w},${y + h - c}`,
    `${x + w - c},${y + h}`,
    `${x + c},${y + h}`,
    `${x},${y + h - c}`,
    `${x},${y + c}`,
  ].join(" ");
}

function centroid(box: [number, number, number, number, number]) {
  const [x, y, w, h] = box;
  return { x: x + w / 2, y: y + h / 2 };
}

function AreaLabel({ name, x, y }: { name: string; x: number; y: number }) {
  const text = name.toUpperCase();
  if (text.length <= 11) {
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
        {text}
      </text>
    );
  }
  const [first, ...rest] = text.split(/[\s-]/);
  return (
    <text x={x} y={y} textAnchor="middle">
      <tspan x={x} dy="-0.35em">
        {first}
      </tspan>
      <tspan x={x} dy="1.2em">
        {rest.join(" ")}
      </tspan>
    </text>
  );
}

export function TriangleMapGraphic() {
  return (
    <div className="area-map">
      <svg viewBox="0 0 980 720" role="group" aria-label="Triangle cities">
        {triangleAreas.map((area, index) => {
          const box = boxes[area.slug];
          if (!box) return null;
          const center = centroid(box);
          return (
            <a key={area.slug} href={listingsSearchUrl(area.name)}>
              <polygon points={polygon(box)} fill={fills[index % fills.length]} />
              <AreaLabel name={area.name} x={center.x} y={center.y} />
            </a>
          );
        })}
      </svg>
    </div>
  );
}
