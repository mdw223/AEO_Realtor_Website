import { TriangleMapGraphic } from "@/components/triangle-map-graphic";
import { triangleAreas } from "@/data/triangle-areas";
import { listingsSearchUrl } from "@/lib/site-config";

export function HomeTriangleMap() {
  const areas = [...triangleAreas].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section id="guides" className="section area-section">
      <div className="section__inner areas">
        <div>
          <p className="eyebrow">Click to explore</p>
          <h2 className="section-title">Triangle Areas</h2>
          <div className="area-list">
            {areas.map((area) => (
              <a key={area.slug} href={listingsSearchUrl(area.name)}>
                {area.name}, NC
              </a>
            ))}
          </div>
          <div className="partner__actions">
            <a className="btn btn--navy" href={listingsSearchUrl()}>
              Explore All
            </a>
            <a className="btn btn--gold" href={listingsSearchUrl("Raleigh")}>
              Explore Neighborhoods
            </a>
          </div>
        </div>
        <TriangleMapGraphic />
      </div>
    </section>
  );
}
