export async function saveBooking(bookingData) {
  try {
    const response = await fetch("http://localhost:5002/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const responseData = await response.json();
    console.log("Booking saved successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error; 
  }
}


export async function fetchBookings() {
  try {
    const response = await fetch("http://localhost:5002/booking");
    return await response.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function deleteBooking(id) {
  try {
    const response = await fetch(`http://localhost:5002/booking/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }
    return id; // Return the ID of the deleted booking
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}



