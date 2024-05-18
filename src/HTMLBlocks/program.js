const ProgramUniversitiesStyle = () => `
.card-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 20px 5px;
}
.card {
  display: grid;
  grid-template-columns: 3fr 5fr 2fr 1fr;
  grid-template-rows: auto auto;
}
.course-item {
  background-color: #e6e5e68c;
  border-radius: 10px;
  text-align: start;
  padding: 10px 5px 5px 7px;
  align-items: start;
  row-gap: 5px;
  column-gap: 10px;
  box-shadow: 0px 18px 36px -28px rgb(123, 104, 123, 0.9), 0px 30px 20px -35px rgb(109, 109, 109, 0.25);
}

.whole-box {
  font-size: 12px;
  max-width: 100vw;
  font-family: 'Poppins';
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
h6, p {
  margin:0;
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
  padding: 10px;
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
}
/* program */

.course-item *{
  margin: 0;
}
.course-item #uni-logo{
  width: 135px;
  align-self: center;
}
.course-item #uni-type{
  width: 45px;
}
.course-item.program{
  justify-items: start;
  border: 2px solid #ee8c00;
}

.program > img{
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: center;
}
.uni-log{
  align-self: center;
}
.course-name{
  font-size: 12px;
  grid-column-start: 2;
  grid-column-end: 4;
  align-self: end;
  
}
.study-mode{
  justify-self: end;

}
.uni-type{
  grid-column-start: 4;
  grid-column-end: 5;
  align-self: start;
}

`;

const programUniversitiesBlock = () => `  <div id="program-search-box" class="search-box program">
<input
  type="search"
  class="search-input program"
  id="program-search-input"
  placeholder="Search for university Name..."
  onkeyup="setProgramSearchInput()"
/>
<div>
  <div id="program-sort-box" class="sort-box program" onclick="toggleProgramSortView()">
      &#8645
    <div class="sort-option program" id="program-sort-option">
      <div id="program-ranking-asc" onclick="setProgramSort('ranking-asc')" class="" style="background-color: #eff5f6">Most Wanted</div>
      <div id="program-full_cost-asc" onclick="setProgramSort('full_cost-asc')" class="">Price Low-High</div>
      <div id="program-full_cost-desc" onclick="setProgramSort('full_cost-desc')" class="">Price High-Low</div>
    </div>
  </div>
</div>
</div>
<div id="program-filter-box" class="filter-box">
  <select name="study-mode" id="program-study-mode" title="study-mode" class="filter-input" onchange="setStudyMode()">
  </select>
</div>

<div id="program-card-list" class="card-list program">

</div>
<div id="program-load-more-button">
<button class="load-more program" onclick="programFetchMore()">Load more</button>
</div>
`;
module.exports = {
  programUniversitiesBlock,
  ProgramUniversitiesStyle,
};
