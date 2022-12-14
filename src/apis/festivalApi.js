const base_URL = 'https://it-cw2-festivalapp-api.onrender.com'
// const base_URL = 'http://localhost:3500'  - for local ver
export const loginUser = async (existingUser) => {
    const response = await fetch(`${base_URL}/api/users/login/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(existingUser),
    })

    if (!response.ok) {
        throw new Error(response.json().message)
    }

    return response.json()
}

export const registerUser = async (newUser) => {
    const response = await fetch(`${base_URL}/api/users/register/`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newUser),
    })
    if (!response.ok) {
        throw new Error(response.json().message)
    }

    return response.json()
}

export const getUsers = async (token) => {
    const response = await fetch(`${base_URL}/api/users/`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}




export const updateUser = async (user, token) => {
    const response = await fetch(`${base_URL}/api/users/${user.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(user),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}

export const deleteUser = async (user, token) => {
    // console.log(user.id)
    const response = await fetch(`${base_URL}/api/users/${user.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(user),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}

export const getComedians = async (token) => {
    const response = await fetch(`${base_URL}/api/comedians/`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}


export const createComedian = async (newComedian, token) => {
    const response = await fetch(`${base_URL}/api/comedians/`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newComedian),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}


export const updateComedian = async (comedian, token) => {
    const response = await fetch(`${base_URL}/api/comedians/${comedian.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(comedian),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}

export const deleteComedian = async (comedian, token) => {
    // console.log(comedian.id)
    const response = await fetch(`${base_URL}/api/comedians/${comedian.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(comedian),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}


export const getVenues = async (token) => {
    const response = await fetch(`${base_URL}/api/venues/`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "GET",
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}


export const createVenue = async (newVenue, token) => {
    const response = await fetch(`${base_URL}/api/venues/`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newVenue),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}


export const updateVenue = async (venue, token) => {
    // console.log(venue)
    const response = await fetch(`${base_URL}/api/venues/${venue.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(venue),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}

export const deleteVenue = async (venue, token) => {
    const response = await fetch(`${base_URL}/api/venues/${venue.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(venue),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}

export const getEvents = async () => {
    const response = await fetch(`${base_URL}/api/events/`, {
        method: "GET",
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}


export const createEvent = async (newEvent, token) => {
    const response = await fetch(`${base_URL}/api/events/`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newEvent),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}


export const updateEvent = async (event, token) => {
    const response = await fetch(`${base_URL}/api/events/${event.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(event),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}

export const deleteEvent = async (event, token) => {
    const response = await fetch(`${base_URL}/api/events/${event.id}`, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(event),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return await response.json()
}

export const getAnEvent = async (event, token) => {
    const response = await fetch(`${base_URL}/api/events/${event.id}`, {
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        method: "GET",
        body: JSON.stringify(event),
    })
    if (!response.ok) {
        throw new Error(response.json())
    }
    return response.json()
}


