import React from "react";
import moment from "moment";
import deleteIcon from "../../../assets/icons/deleteIcon.png";
import editIcon from "../../../assets/icons/editIcon.png";
import styles from "./index.module.scss";
import NoteUtils from "./utils";

const NoteItem = React.memo(({ title, content, date, onEdit, onDelete }) => {
  return (
    <div
      style={{
        backgroundColor: NoteUtils.getContrastColor(),
      }}
      className={styles["note-item"]}
    >
      <h3 className={styles["note-title"]}>{title}</h3>
      <p className={styles["note-content"]}>{content}</p>
      <div className={styles["note-meta"]}>
        <div className={styles["note-date"]}>
          {moment(date).format("MMMM D, YYYY")}
        </div>
        <div className={styles["note-actions"]}>
          <button
            title="edit"
            className={`${styles.btn} ${styles["btn-secondary"]}`}
            onClick={onEdit}
          >
            <img src={editIcon} height={18} width={18} />
          </button>
          <button
            title="delete"
            className={`${styles.btn} ${styles["btn-danger"]}`}
            onClick={onDelete}
          >
            <img src={deleteIcon} height={18} width={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default NoteItem;
