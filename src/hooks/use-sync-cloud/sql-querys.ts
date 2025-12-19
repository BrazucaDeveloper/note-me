/* ------ 📝 Note querys ----- */

const uploadNoteQuery: string = `
INSERT INTO note (cid, title, content, isPined, owner, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(owner) DO UPDATE SET
  title = excluded.title,
  content = excluded.content,
  isPined = excluded.isPined;
`

const downloadNoteQuery: string = `
SELECT * FROM note WHERE owner = ?
AND status = 'active'
AND updatedAt BETWEEN ? AND ?;
`

/* ------ 🏷️ Tag querys ----- */

const uploadTagQuery: string = `
INSERT INTO tag (cid, title, owner, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?)
ON CONFLICT(owner) DO UPDATE SET
  title = excluded.title;
`

const downloadTagQuery: string = `
SELECT * FROM tag WHERE owner = ?
AND status = 'active'
AND updatedAt BETWEEN ? AND ?;
`

/* ------ 📝🏷️ NoteTag querys ----- */

const uploadNoteTagQuery: string = `
INSERT INTO note_tag (note, tag, owner, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?)
ON CONFLICT(owner) DO UPDATE SET
  note = excluded.note,
  tag = excluded.tag;
`

const downloadNoteTagQuery: string = `
SELECT * FROM note_tag WHERE owner = ?
AND status = 'active'
AND updatedAt BETWEEN ? AND ?;
`

export const sqlQuerys = {
	uploadNoteQuery,
	uploadTagQuery,
	uploadNoteTagQuery,
	downloadNoteQuery,
	downloadTagQuery,
	downloadNoteTagQuery,
}
