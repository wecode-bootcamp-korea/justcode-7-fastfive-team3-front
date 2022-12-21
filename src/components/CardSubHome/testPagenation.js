import React, {
  useState,
  useEffect,
} from 'https://cdn.skypack.dev/react@17.0.1';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1';
import Pagination from 'https://cdn.skypack.dev/rc-pagination@3.1.15';

const App = () => {
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const PerPageChange = value => {
    setSize(value);
    const newPerPage = Math.ceil(datatableUsers.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return datatableUsers.slice((current - 1) * pageSize, current * pageSize);
  };

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <button>
          <i className="fa fa-angle-double-left"></i>
        </button>
      );
    }
    if (type === 'next') {
      return (
        <button>
          <i className="fa fa-angle-double-right"></i>
        </button>
      );
    }
    return originalElement;
  };

  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-filter-info">
                  <Pagination
                    className="pagination-data"
                    showTotal={(total, range) =>
                      `Showing ${range[0]}-${range[1]} of ${total}`
                    }
                    onChange={PaginationChange}
                    total={datatableUsers.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-text-small mb-0">
                    <thead className="thead-primary table-sorting">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getData(current, size).map((data, index) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.position}</td>
                            <td>{data.gender}</td>
                            <td>{data.email}</td>
                            <td>{data.salary}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="table-filter-info">
                  <Pagination
                    className="pagination-data"
                    showTotal={(total, range) =>
                      `Showing ${range[0]}-${range[1]} of ${total}`
                    }
                    onChange={PaginationChange}
                    total={datatableUsers.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
