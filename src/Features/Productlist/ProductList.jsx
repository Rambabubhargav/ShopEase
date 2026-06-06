import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
const ProductList = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [btnlen, setBtnlen] = useState(0);

    const perpage = 10;

    useEffect(() => {

        async function categorydata() {

            let { data } = await axios.get(
                "https://dummyjson.com/products/category-list"
            );

            setCategoryList(data);
        }

        categorydata();

    }, []);

    useEffect(() => {

        async function threeApi() {

            let api;

            if (category) {
                api = `https://dummyjson.com/products/category/${category}`;
            }
            else if (search) {
                api = `https://dummyjson.com/products/search?q=${search}`;
            }
            else {
                api = "https://dummyjson.com/products";
            }

            let { data } = await axios.get(api);

            let allproducts = data.products || [];

            setBtnlen(allproducts.length);

            let pagination = allproducts.slice(
                (page - 1) * perpage,
                page * perpage
            );

            setProducts(pagination);
        }

        threeApi();

    }, [search, category, page]);

    let viewbtns = Math.ceil(btnlen / perpage);

    return (
        <>
            <div className="container">

                <div className="row justify-content-between mb-4 mt-3">

                    <div className="col-5">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search item..."
                            value={search}
                            onChange={(e) => {
                                setCategory("");
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />

                    </div>

                    <div className="col-5">

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                                setPage(1);
                            }}
                        >

                            <option value="">All Categories</option>

                            {
                                categoryList.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))
                            }

                        </select>

                    </div>

                </div>

            </div>

            <div
                className="container"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >

                {
                    products.map((item) => (

                        <div
                            key={item.id}
                            className="border border-2 border-dark p-4 m-4 text-center"
                            style={{
                                width: "300px",
                                borderRadius: "10px",
                            }}
                        >

                            <Link
                                className="text-decoration-none text-dark"
                                to={`/products/${item.id}`}
                            >

                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="card-img-top"
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />

                                <h3 className="mt-2">
                                    {item.title}
                                </h3>

                                <mark>
                                    ${item.price}
                                </mark>

                            </Link>

                        </div>

                    ))
                }

            </div>

            <div className="container text-center mb-3 mt-3">

                {
                    viewbtns > 0 &&
                    Array.from(
                        { length: viewbtns },
                        (_, i) => i + 1
                    ).map((btn) => (

                        <button
                            className="btn btn-primary m-2"
                            key={btn}
                            onClick={() => setPage(btn)}
                        >
                            {btn}
                        </button>

                    ))
                }

            </div>
        </>
    );
};

export default ProductList;