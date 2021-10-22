import React, { useState, createContext, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';




export const LocalStateContext = createContext({});



const SECTIONS_QUERY = gql`
  query SECTIONS_QUERY {
    allSidebarSections {
      id
      name
      items {
        id
        name
        categories {
          id
          name
        }
      }
    }
  }
`;

const SideBarStateProvider = ({ children }) => {
  const { loading, error, data } = useQuery(SECTIONS_QUERY);

  // state 
  const [sections, setSections] = useState();
  const [sideBarActive, setSideBarActive] = useState(false);
  const [togglList, setTogglList] = useState({
    active: false,
    sectionId: undefined,
    itemId: undefined,
  });
  const [selectedDpt, setSelectedDpt] = useState([]);


  // effects
useEffect(() => {
  data && setSections(data.allSidebarSections);
},[data])

  useEffect(() => {
    if (!sideBarActive) {
      setTogglList({ active: false, sectionId: undefined, itemId: undefined });
    }
  }, [sideBarActive]);

  useEffect(() => {
    if (togglList.sectionId && togglList.itemId) {
      const section = sections?.filter(
        (section) => section.id === togglList.sectionId
      );
      section[0].items.map(
        (item) => item.id === togglList.itemId && setSelectedDpt(item)
      );
    }
  }, [sections, togglList.sectionId, togglList.itemId]);
  
  
  
  return (
    <LocalStateContext.Provider
      value={{
        sections,
        setSections,
        sideBarActive,
        setSideBarActive,
        togglList,
        setTogglList,
        selectedDpt,
        setSelectedDpt,
      }}>
      {children}
    </LocalStateContext.Provider>
  );
};

export default SideBarStateProvider;
