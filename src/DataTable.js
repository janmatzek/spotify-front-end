import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
import LoadingIndicator from "./LoadingIndicator"; // Import LoadingIndicator component

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const period = "last_24";

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      // Simulate fetching data from an API
      const response = await fetch(process.env.REACT_APP_TABLE_URL + period);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="table-container">
      {/* <Heading {...headingStyles}>TOP 5 TRACKS</Heading> */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>TOP 5 TRACKS</Th>
              <Th>TRACK NAME</Th>
              <Th>ALBUM</Th>
              <Th>ARTIST</Th>
              <Th>LINK</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <img
                    src={item.album_image_url}
                    alt={item.name}
                    style={{ maxWidth: "100px" }}
                  />
                </Td>
                <Td>{item.track_name}</Td>
                <Td>{item.album_name}</Td>
                <Td>{item.artist_name}</Td>
                <Td>
                  <Link href={item.track_url} isExternal>
                    🎵
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default DataTable;
