const uniCoursesBlock = () => `


<div id="card-list" class="card-list"></div>
<div id="load-more-button">
  <button class="load-more" onclick="fetchMore()">Load more</button> 
  </div>
`;

const uinCoursesStyle = () => `

.whole-box {
  font-size:12px;
  max-width: 100vw;
  font-family: 'Poppins';
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
.search-box {
  min-width: 200px;
  width : 100%;
  height: 40px;
  border-radius: 30px;
  background-color: #eff4f7;
  padding: 0 15px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}
.filter-box{
  display: flex;
    flex-grow: 1;
    width: 100%;
    gap:15px;
}
.filter-box select{
  background-color: #eff4f7;
  border-right: 16px solid transparent;
}
.search-input,
.filter-input {
  font-size: 12px;
  border-radius: 30px;
  border-style: none;
  border: none;
  background-color: inherit;
  outline: none;
  width: 100%;
  height: 100%;
  color: #005562;

}
.load-more {
  width: 240px;
  background-color: #fff;
  border-radius: 50px;
  padding: 9px 15px;
  border: none;
}
.sort-box {
  color: #005562;
  border: 3px solid;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  padding: "3px",
}
.sort-box .sort-option {
  visibility: hidden;
  width: 120px;
  font-size: small;
  background-color: #fff;
  color: #005562;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 150%;
  right: -25%;
  margin-left: -60px;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.1);
}
.sort-box .sort-option::after {
  content: "";
  position: absolute;
  bottom: 100%;
  right: 5%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}
.sort-option > div {
  cursor: pointer;
  padding: 5px;
}
.sort-option > div:hover {
  background-color: #eff5f6 !important;
}
.sort-option > div:active {
  background-color: #f9f9f9 !important;
}`;
module.exports = {
  uinCoursesStyle, uniCoursesBlock
};
