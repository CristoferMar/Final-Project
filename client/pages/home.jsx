import React from 'react';

export default function Home(props) {
  return (
    <div className="page align-center">
      <div className="form-container">
        <form className="center-content column" action="">
          <h3 className="form-title">Create A New List</h3>
          <label htmlFor="listName">Name of New List</label>
          <input type="text" className="text-box" name="listName" id="listName" />
          <div className="center-content space-between">
            <button className="form-btn purple">Cancel</button>
            <input type="submit" className="form-btn blue" value="Save" />
          </div>
      </form>
    </div>
  </div>
  );
}
