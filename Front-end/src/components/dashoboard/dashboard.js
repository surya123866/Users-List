import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../actions/actions";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.scss";
import Header from "../header/header";
import Footer from "../footer/footer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [filterOption, setFilterOption] = useState(
    localStorage.getItem("filterOption")
      ? localStorage.getItem("filterOption")
      : "A-Z"
  );
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUsers());
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const filteredUsers = () => {
    // Apply filtering based on the selected filter option
    let sortedUsers = [...users];

    switch (filterOption) {
      case "A-Z":
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "LastModified":
        sortedUsers.sort(
          (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
        );
        break;
      case "LastInserted":
        sortedUsers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply search filter
    return sortedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.mobile.includes(searchKeyword)
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete selected users?")) {
      dispatch(deleteUser(userId));
      dispatch(getUsers());
    }
  };

  const handleFilterOption = (filterOption) => {
    localStorage.setItem("filterOption", filterOption);
    setFilterOption(filterOption);
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const onPrevData = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onNextData = () => {
    const totalPages = Math.ceil(filteredUsers().length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const totalPages = Math.ceil(filteredUsers().length / itemsPerPage);

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-table">
          <div className="dashboard-header"></div>
          <div className="table-header">
            <div className="add-container">
              <h4>All ({users.length})</h4>
              <Link to={"/add-user"}>
                <button className="add-user-btn">Add User</button>
              </Link>
            </div>
            <div className="search-and-filter">
              <input
                type="text"
                placeholder="Search by Name, Mobile, or Email"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <select
                value={filterOption}
                onChange={(e) => handleFilterOption(e.target.value)}
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="LastModified">Last Modified</option>
                <option value="LastInserted">Last Inserted</option>
              </select>
            </div>
          </div>
          {error ? (
            <h3>{error}</h3>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectedUsers.length === filteredUsers().length) {
                          // If all users are selected, unselect all
                          setSelectedUsers([]);
                        } else {
                          // If not all users are selected, select all
                          setSelectedUsers(
                            filteredUsers().map((user) => user._id)
                          );
                        }
                      }}
                    />
                  </th>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Edit</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through users based on search and filter criteria */}
                {loading
                  ? Array(10)
                      .fill(null)
                      .map((_, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            <Skeleton className="image-skeleton" />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <Skeleton />
                          </td>
                          <td>
                            <button className="Edit-btn">Edit</button>
                          </td>
                          <td>
                            <button className="delete-btn">Edit</button>
                          </td>
                        </tr>
                      ))
                  : filteredUsers()
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((user) => (
                        <tr key={user._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user._id)}
                              onChange={() => {
                                setSelectedUsers((prev) => {
                                  if (prev.includes(user._id)) {
                                    // Unselect if already selected
                                    return prev.filter((id) => id !== user._id);
                                  } else {
                                    // Select if not selected
                                    return [...prev, user._id];
                                  }
                                });
                              }}
                            />
                          </td>
                          <td>
                            <img
                              src={`${
                                user.image
                                  ? user.image
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrgu4a7W_OM8LmAuN7Prk8dzWXm7PVB_FmA&usqp=CAU"
                              }`}
                              alt="User"
                            />
                          </td>

                          <td>
                            <Link
                              className="link-text"
                              style={{ textDecoration: "none" }}
                              to={`/user-details/${user._id}`}
                            >
                              {user.name}
                            </Link>
                          </td>
                          <td>
                            <Link
                              className="link-text"
                              style={{ textDecoration: "none" }}
                              to={`/user-details/${user._id}`}
                            >
                              {user.email}{" "}
                            </Link>
                          </td>
                          <td>
                            <Link
                              className="link-text"
                              style={{ textDecoration: "none" }}
                              to={`/user-details/${user._id}`}
                            >
                              {user.mobile}{" "}
                            </Link>
                          </td>
                          <td>
                            <button
                              className="Edit-btn"
                              onClick={() => handleEditUser(user._id)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          )}
          <div className="table-footer">
            <div className="pagination">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, users.length)} of{" "}
              {users.length} entries
            </div>

            <div className="pagination-buttons">
              <button onClick={onPrevData} disabled={currentPage === 1}>
                Prev
              </button>
              {[
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2,
              ]
                .filter((page) => page > 0 && page <= totalPages)
                .map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                ))}
              <button
                onClick={onNextData}
                disabled={currentPage === itemsPerPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
