import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { getCategories, saveInterests } from "../features/user/thunks";
import { setSelectedInterests } from "../features/user/userSlice";

const ITEMS_PER_PAGE = 6;

const CategorySelector = () => {
  const dispatch = useDispatch();
  const { categories, currentPage, totalPages, interests } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getCategories({ page: currentPage, limit: ITEMS_PER_PAGE }));
  }, [dispatch, currentPage]);

  const handleCheckboxChange = (categoryId) => {
    let selectedInterests;
    if (interests.includes(categoryId)) {
      selectedInterests = interests.filter((id) => id !== categoryId);
    } else {
      selectedInterests = [...interests, categoryId];
    }
    dispatch(setSelectedInterests(selectedInterests));
    dispatch(saveInterests({ interests: selectedInterests }));
  };

  return (
    <div>
      <form className="ms-3">
        <label className="fw-semibold fs-5 py-3">My saved interests!</label>
        <div className="mb-3">
          {categories.map((category) => (
            <div key={category.id} className="form-check mb-4">
              <input
                type="checkbox"
                id={category.id}
                className="form-check-input me-3"
                checked={interests.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              />
              <label htmlFor={category.id} className="form-check-label">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </form>
      {/* Pagination Controls */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default CategorySelector;
