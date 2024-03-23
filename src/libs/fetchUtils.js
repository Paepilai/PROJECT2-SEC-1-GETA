const handleResponse = response => {
  if (!response.ok) {
    throw new Error(`error: ${response.status}`);
  }
  return response.json();
};

const fetchUtils = {
  async create(data) {
    try {
      const response = await fetch('/api/resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Create operation failed:', error);
    }
  },
  async read(id) {
    try {
      const response = await fetch(`/api/resource/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Read operation failed:', error);
    }
  },
  async update(id, data) {
    try {
      const response = await fetch(`/api/resource/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Update operation failed:', error);
    }
  },
  async delete(id) {
    try {
      const response = await fetch(`/api/resource/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Delete operation failed:', error);
    }
  }
};

export default fetchUtils;
