import React, { useState, useEffect } from "react";

const MemberForm = ({ member, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Efekt używany do ustawienia początkowych wartości pól formularza lub ich aktualizacji
  useEffect(() => {
    if (member) {
      setName(member.name);
      setExpiryDate(member.expiryDate);
    } else {
      setName("");
      setExpiryDate("");
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: member ? member.id : Date.now(), name, expiryDate });
    setName(""); // Resetowanie pola 'name' po zapisie
    setExpiryDate(""); // Resetowanie pola 'expiryDate' po zapisie
  };

  const handleCancel = () => {
    onCancel();
    setName(""); // Resetowanie pola 'name' po anulowaniu
    setExpiryDate(""); // Resetowanie pola 'expiryDate' po anulowaniu
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Imię i Nazwisko:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data ważności karnetu:</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Zapisz</button>
      <button type="button" onClick={handleCancel}>
        Anuluj
      </button>
    </form>
  );
};

export default MemberForm;
