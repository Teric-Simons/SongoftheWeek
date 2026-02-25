import "./SelectUserPage.css";

function SelectUserPage({ selectedName, onSelectName, onDone }) {
  const buttons = ["Teric", "Jada", "Ben", "Kymani", "Erick", "Jonathon"];

  return (
    <div className="select-page">
      <main className="select-card">
        <h1>Who are you?</h1>

        <div className="profiles">
          {buttons.map((text) => (
            <div key={text} className="profile-item">
              <button
                className={`circle-btn ${selectedName === text ? "selected" : ""}`}
                onClick={() => onSelectName(text)}
                aria-label={`Select ${text}`}
              />
              <p className="profile-text">{text}</p>
            </div>
          ))}
        </div>

        <button className="done" disabled={!selectedName} onClick={onDone}>
          Done
        </button>
      </main>
    </div>
  );
}

export default SelectUserPage;
