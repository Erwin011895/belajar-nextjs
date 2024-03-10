export async function callNotesAPI({ urlPostfix = '', method = 'GET', bodyData = '' } = {}) {
  let requestInit = {
    method: method,
  }

  if (method !== 'GET') {
    requestInit = {
      ...requestInit,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData),
    }
  }

  const response = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes' + urlPostfix, requestInit)
  return response.json()
}

export default async function handler(req, res) {
  try {
    const response = callNotesAPI()
    res.status(200).json({ ...response })
  } catch (error) { console.log(error); }
}

// GET
// /api/notes

// POST
// /api/notes

// GET
// /api/notes/{note_id}

// PATCH
// /api/notes/update/{note_id}

// DELETE
// /api/notes/delete/{note_id}