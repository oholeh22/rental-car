import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/cars/slice";
import { fetchBrands } from "../../redux/cars/operations/fetchBrands";
import { Formik, Form, Field } from "formik";
import s from "./Filters.module.css";

const NumberWithCommaField = ({ field, form, ...props }) => {
  const formatNumber = (value) => {
    if (!value) return "";
    const numStr = value.toString().replace(/\D/g, "");
    const number = parseInt(numStr, 10);
    return isNaN(number) ? "" : number.toLocaleString("en-US");
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    form.setFieldValue(field.name, rawValue);
  };

  return (
    <input
      {...field}
      {...props}
      value={formatNumber(field.value)}
      onChange={handleChange}
    />
  );
};

const FilterForm = () => {
  const [brands, setBrands] = useState([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);
  const [error, setError] = useState(null);
  const [brandFocused, setBrandFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Failed to load brands");
      } finally {
        setIsLoadingBrands(false);
      }
    };

    fetchBrandData();
  }, []);

  const prices = useMemo(() => {
    const arr = [];
    for (let i = 30; i < 200; i += 10) {
      arr.push(i);
    }
    return arr;
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(setFilters(values));
    setSubmitting(false);
  };

  return (
    <div className={s.filters}>
      {isLoadingBrands ? (
        <p>Loading brands...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Formik
          initialValues={{
            brand: "",
            price: "",
            minMileage: "",
            maxMileage: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={s.filters__form}>
              <div className={s.filters__field}>
                <label htmlFor="brand">Car brand</label>
                <Field name="brand">
                  {({ field, meta }) => (
                    <div
                      className={`${s.selectWrapper} ${
                        brandFocused ? s.rotated : ""
                      }`}
                    >
                      <select
                        {...field}
                        id="brand"
                        className={s.filters__select}
                        onFocus={() => setBrandFocused(true)}
                        onBlur={(e) => {
                          setBrandFocused(false);
                          field.onBlur(e);
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value !== "") {
                            e.target.blur();
                          }
                        }}
                      >
                        <option value="">Choose a brand</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </Field>
              </div>

              <div className={s.filters__field}>
                <label htmlFor="price">Price / 1 hour</label>
                <Field name="price">
                  {({ field, meta }) => (
                    <div
                      className={`${s.selectWrapper} ${
                        priceFocused ? s.rotated : ""
                      }`}
                    >
                      <select
                        {...field}
                        id="price"
                        className={s.filters__select}
                        onFocus={() => setPriceFocused(true)}
                        onBlur={(e) => {
                          setPriceFocused(false);
                          field.onBlur(e);
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value !== "") {
                            e.target.blur();
                          }
                        }}
                      >
                        <option value="">Choose a price</option>
                        {prices.map((price) => (
                          <option key={price} value={price}>
                            {price}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </Field>
              </div>

              <div className={s.filters__field}>
                <label htmlFor="mileage">Car mileage / km</label>
                <div className={s.mileageContainer}>
                  <div className={s.mileageInputContainer}>
                    <span className={s.mileagePrefix}>From</span>
                    <Field
                      name="minMileage"
                      id="minMileage"
                      component={NumberWithCommaField}
                      className={s.mileageInput}
                    />
                  </div>
                  <div className={s.mileageDivider}></div>
                  <div className={s.mileageInputContainer}>
                    <span className={s.mileagePrefix}>To</span>
                    <Field
                      name="maxMileage"
                      id="maxMileage"
                      component={NumberWithCommaField}
                      className={s.mileageInput}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={s.filters__button}
              >
                Search
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default FilterForm;
