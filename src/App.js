import React, { useEffect, useState, useReducer } from "react";
import "./index.scss";
import { Collection } from "./Collection";
import { reducer } from "./reducer";

const categories = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
];

const DEFAULT_STATE = {
    isLoading: true,
    success: false,
    error: false,
    data: [],
};

function App() {
    const [category, setCategory] = useState(0);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

    useEffect(() => {
        const categoryComputed = category ? `category=${category}` : "";
        dispatch({ type: "FETCH_START" });
        fetch(
            `https://63487eb90484786c6e9ad659.mockapi.io/collections?${categoryComputed}&page=${page}&limit=2`
        )
            .then((res) => res.json())
            .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
            .finally(() => dispatch({ type: "FETCH_END" }))
            .catch((err) => dispatch({ type: "FETCH_FAIL", error: err }));
    }, [category, page]);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((el, i) => (
                        <li
                            key={el.name}
                            id={i}
                            className={category === i ? "active" : ""}
                            onClick={() => setCategory(i)}
                        >
                            {el.name}
                        </li>
                    ))}
                </ul>
                <input
                    className="search-input"
                    placeholder="Поиск по названию"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div className="content">
                {state.isLoading ? (
                    <h2>Загрузка...</h2>
                ) : (
                    state.data
                        .filter((el) =>
                            new RegExp(searchValue, "i").test(
                                el.name.replace(/\s/g, "")
                            )
                        )
                        .map((element, index) => (
                            <Collection
                                key={index}
                                name={element.name}
                                images={element.photos}
                            />
                        ))
                )}
            </div>
            <ul className="pagination">
                {[...Array(5)].map((_, i) => (
                    <li
                        className={page === i + 1 ? "active" : ""}
                        key={i}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
