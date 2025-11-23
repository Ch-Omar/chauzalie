import "../styles/home.css";
import "@/styles/globals.scss"

const categories = ["PANTOUFLES", "SABOTS", "BASKETS"];
const testImage = "/uploads/1763214670122-6eaf5d9e-ab87-461d-ac2e-555bc56177da.png";

export default function HomePage() {
  return (
    <div>
      {/* Haut Section */}
      <div className="row cards">
        <div className="col-md-4 card-product">
          <img
            src="/uploads/1763214670122-6eaf5d9e-ab87-461d-ac2e-555bc56177da.png"
            className="img"
          />
        </div>
        <div className="col-md-4 card-product">
          <img
            src="/uploads/1763214670122-6eaf5d9e-ab87-461d-ac2e-555bc56177da.png"
            className="img1"
          />
        </div>
        <div className="col-md-4 card-product">
          <img
            src="/uploads/1763214670122-6eaf5d9e-ab87-461d-ac2e-555bc56177da.png"
          />
        </div>
      </div>

      {/* Section des catégories */}
      <div className="categories-container">
        {categories.map((title) => (
          <div className="category" key={title}>
            <h2 className="category-title">{title}</h2>
            <div className="row cards">
              {[1, 2, 3, 4].map((num) => (
                <div className="col-md-2" key={num}>
                  <img src={testImage} className="category-img"  />
                </div>
              ))}
              <p className="see-more">Voir plus</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}