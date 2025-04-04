import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Collapse, Divider } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

function TreeView({ treeData, handleFilterChange }) {
  const [openGroups, setOpenGroups] = useState({});

  const handleGroupClick = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <Box
      sx={{
        flexBasis: "15%",
        maxHeight: "calc(100vh - 150px)",
        overflow: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <List>
        <ListItem button onClick={() => handleFilterChange("all")}>
          <ListItemText
            primary="All"
            primaryTypographyProps={{ fontWeight: "bold", color: "#00796b" }}
          />
        </ListItem>
        <Divider />

        {treeData.map((group, groupIndex) => (
          <div key={groupIndex}>
            <ListItem button onClick={() => handleGroupClick(groupIndex)}>
              <ListItemText primary={group.label} primaryTypographyProps={{ fontWeight: "bold", color: "#00796b" }} />
              {openGroups[groupIndex] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider />
            <Collapse in={openGroups[groupIndex]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {group.pages?.map((page, pageIndex) => (
                  <ListItem key={pageIndex} button sx={{ pl: 4 }} onClick={page.onClick}>
                    <ListItemText primary={page.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
      
      <ListItem button onClick={() => handleFilterChange("advanced")}>
          <ListItemText
            primary="Advanced User Settings"
            primaryTypographyProps={{ fontWeight: "bold", color: "#00796b"}}
          />
      </ListItem>
        
    </Box>
  );
}

export default TreeView;
