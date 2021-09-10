import { useState } from "react";
import { useEffect } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMAL = ["bird", "cat", "dog", "rabbit", "reptile"];


const SearchParams = () => {
    const [location, setLocation] = useState("Seattle, WA");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);

    useEffect(() => {
        requestPets();
    }, [animal]);

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();

        setPets(json.pets);
        console.log(json.pets);
    }

    return (

        <div className="my-0 mx-auto w-11/12">
            <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900" onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" className="w-60 my-6" onChange={(e) => setLocation(e.target.value)}
                        value={location} placeholder="location" />
                </label>

                <label htmlFor="animal" >
                    Animal
                    <select id="animal" className="w-60 my-6" value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        onBlur={(e) => setAnimal(e.target.value)}>
                        <option></option>
                        {ANIMAL.map(animal => (
                            <option value={animal} key={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed" >
                    Breed
                    <select id="breed" className="w-60 my-6" value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        onBlur={(e) => setBreed(e.target.value)}>
                        <option></option>
                        {breeds.map(breed => (
                            <option value={breed} key={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="rounded px-6 py-2 color text-white hover:opacity-50 border-none">Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams