const API_URL = 'http://192.168.56.1:3030'; // Altere conforme necessário

export const fetchSchools = async () => {
    try {
        const response = await fetch(`${API_URL}/school`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }

        const json = await response.json();
        console.log(json); // Para verificar o que está sendo retornado
        return json.schools; // Retorna os dados obtidos
      } catch (error) {
        console.log(error);
        throw error; // Propaga o erro para o chamador
      }

};

export const createSchool = async (data) => {
  const response = await fetch(`${API_URL}/school/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create school');
  }
  return response.json();
};

export const loginSchool = async (data) => {
  const response = await fetch(`${API_URL}/school/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to log in');
  }
  return response.json();
};

export const listPendingRequests = async (schoolId) => {
  const response = await fetch(`${API_URL}/schools/${schoolId}/pending-requests`);
  if (!response.ok) {
    throw new Error('Failed to fetch pending requests');
  }
  return response.json();
};

export const createClass = async (data) => {
  const response = await fetch(`${API_URL}/class`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create class');
  }
  return response.json();
};

export const fetchClasses = async () => {


  try {
    const response = await fetch(`${API_URL}/getall/class`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch schools');
    }

    const json = await response.json();
    console.log(json); // Para verificar o que está sendo retornado
    return json.message; // Retorna os dados obtidos
  } catch (error) {
    console.log(error);
    throw error; // Propaga o erro para o chamador
  }

};
