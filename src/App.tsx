import { useQuery } from "@apollo/client";
import { Data } from "./github-types";
import { GET_GRAPH } from "./queries";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function processData(contributionData: Data) {
  var processedData: any = [];

  var semiFlat =
    contributionData.user.contributionsCollection.contributionCalendar.weeks;
  semiFlat.forEach((x: any) => {
    processedData = [...processedData, x.contributionDays];
  });

  var contributions = processedData.flat();

  var contributionValues: any = contributions
    .map((x: any) => (x = { date: x.date, count: x.contributionCount }))
    .filter((x: any) => x.count !== 0);
  return contributionValues;
}

function App() {
  const { loading, error, data } = useQuery(GET_GRAPH, {
    variables: { userName: "Jack-Cannon" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    return (
      <>
        <CalendarHeatmap
          values={processData(data)}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-scale-${value.count}`;
          }}
        />
      </>
    );
  }
  return <div>hey</div>;
}

export default App;
