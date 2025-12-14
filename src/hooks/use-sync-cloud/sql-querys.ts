const uploadNoteQuery: string = `
INSERT INTO note (cid, title, content, isPined, owner, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(owner) DO UPDATE SET
  title = excluded.title,
  content = excluded.content,
  isPined = excluded.isPined,
  createdAt = excluded.createdAt,
  updatedAt = excluded.updatedAt;
`

export const sqlQuerys = { uploadNoteQuery }
