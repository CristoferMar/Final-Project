import React from 'react';

const styles = {
  background: rgb(147, 32, 224);
  background: linear - gradient(0deg, rgba(147, 32, 224, 1) 0 %, rgba(12, 0, 83, 1) 100 %);
}

export default function PageContainer({ children }) {
  render() {
    return (
      <div className="full-width full-height flex horiz-center blue-gradiant">
        <div className="full-width">
          { children }
        </div>
      </div>
    )
  }
}
