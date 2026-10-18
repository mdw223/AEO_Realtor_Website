import { reviews } from "@/data/reviews";

const googleReviewsUrl =
  "https://www.google.com/search?q=Fatima+Diallo+realtor+Raleigh+NC";

export function HomeReviews() {
  if (!reviews.length) return null;

  return (
    <section className="stories" aria-label="Client reviews">
      <div className="stories__inner">
        <figure className="stories__portrait">
          <img
            src="/images/about.jpg"
            alt="Interior of a Triangle home Fatima helps clients buy and sell"
            width={1400}
            height={933}
          />
          <figcaption>
            <strong>Fatima Diallo</strong>
            <span>Triangle Realtor</span>
          </figcaption>
        </figure>
        <div className="stories__content">
          <p className="eyebrow">Testimonials</p>
          <h2 className="section-title">Client Success Stories</h2>
          <div className="stories__grid">
            {reviews.map((review) => (
              <figure key={review.id}>
                <p className="stars" aria-label={`${review.rating} star rating`}>
                  {"★".repeat(review.rating)}
                </p>
                <blockquote>{review.summary}</blockquote>
                <figcaption>
                  <span className="stories__avatar" aria-hidden="true">
                    {review.author.slice(0, 1)}
                  </span>
                  <span>{review.author}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <a className="stories__more" href={googleReviewsUrl} target="_blank" rel="noreferrer">
            Read reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
