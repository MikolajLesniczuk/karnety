import React from "react";
import "../App.css"; // Importujemy arkusz stylów CSS

const MemberList = ({ members, onEdit, onDelete }) => {
  const getMemberStatusClass = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - today;
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff < 0) {
      return "expired";
    } else if (daysDiff <= 5) {
      return "expired-soon";
    } else {
      return "active";
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete(id);
    }
  };

  return (
    <table className="member-table">
      <thead>
        <tr>
          <th className="name-cell">Imie i Nazwisko</th>
          <th className="status-cell">Status karnetu</th>
          <th className="actions-cell">Akcja</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td className="name-cell">{member.name}</td>
            <td
              className={`status-cell ${getMemberStatusClass(
                member.expiryDate
              )}`}
            >
              {getMemberStatusClass(member.expiryDate) === "expired"
                ? "Nieważny"
                : getMemberStatusClass(member.expiryDate) === "expired-soon"
                ? "Niedługo wygaśnie"
                : "Aktywny"}
            </td>
            <td className="actions-cell">
              <button onClick={() => onEdit(member)}>Zmień dane</button>
              <button onClick={() => handleDelete(member.id, member.name)}>
                Usuń zawodnika
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberList;
