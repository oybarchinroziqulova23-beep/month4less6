import { getData, writeData } from "../helper/file.js";

// GET ALL
export const getCountries = async (_req, res) => {
    const countries = await getData();
    return res.json(countries);
};

// GET BY ID
export const getCountry = async (req, res) => {
    const id = +req.params.id;
    const countries = await getData();
    const country = countries.find(el => el.id === id);

    if (!country) {
        return res.status(404).json({ message: "Country not found" });
    }

    return res.json(country);
};

// POST (CREATE)
export const createCountry = async (req, res) => {
    const countries = await getData();

    const newCountry = {
        id: Date.now(),
        name: req.body.name,
        capital: req.body.capital,
        population: req.body.population,
    };

    countries.push(newCountry);
    await writeData(countries);

    return res.status(201).json(newCountry);
};

// PUT (UPDATE)
export const updateCountry = async (req, res) => {
    const id = +req.params.id;
    const countries = await getData();

    const index = countries.findIndex(el => el.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Country not found" });
    }

    countries[index] = { ...countries[index], ...req.body };
    await writeData(countries);

    return res.json(countries[index]);
};

// DELETE
export const deleteCountry = async (req, res) => {
    const id = +req.params.id;
    let countries = await getData();

    const exists = countries.some(el => el.id === id);
    if (!exists) {
        return res.status(404).json({ message: "Country not found" });
    }

    countries = countries.filter(el => el.id !== id);
    await writeData(countries);

    return res.json({ message: "Deleted successfully" });
};
