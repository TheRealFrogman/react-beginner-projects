import React from "react";

export const Success = ({ count, handleSuccess }) => {
   return (
      <div className="success-block">
         <img src="/assets/success.svg" alt="Success" />
         <h3>Успешно!</h3>
         <p>Всем {count} пользователям отправлено приглашение.</p>
         <button className="send-invite-btn" onClick={handleSuccess}>
            Назад
         </button>
      </div>
   );
};
