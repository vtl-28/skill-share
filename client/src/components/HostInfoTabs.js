import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import HostEvents from "./HostEvents";

const HostInfoTabs = ({ about, _id }) => {
  return (
    <Tabs size="md" variant="line">
      <TabList>
        <Tab _selected={{ color: "#008294", borderBottomColor: "#008294" }}>
          About Host
        </Tab>
        <Tab _selected={{ color: "#008294", borderBottomColor: "#008294" }}>
          Events
        </Tab>
      </TabList>

      <TabPanels w="100%" className="bg-gray-50 ">
        <TabPanel>
          <p>{about}</p>
        </TabPanel>
        <TabPanel>
          <ul className="flex flex-col">
            <HostEvents id={_id} />
          </ul>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HostInfoTabs;
