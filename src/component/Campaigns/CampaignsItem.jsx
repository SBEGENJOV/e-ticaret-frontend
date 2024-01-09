import "./CampaignsItem.css";

const CampaignItem = () => {
  return (
    <div className="campaign-item">
      <h3 className="campaign-title">
        Moda Ayı <br />
        İçin <br />
        Hazır Ol
      </h3>
      <p className="campaign-desc">En Güzel Anlar Seninle Başlar</p>
      <a href="#" className="btn btn-primary">
        Hepsini Gör
        <i className="bi bi-arrow-right"></i>
      </a>
    </div>
  );
};

export default CampaignItem;
