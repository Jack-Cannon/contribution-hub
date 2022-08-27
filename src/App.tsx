import { useQuery } from "@apollo/client";
import { GET_GRAPH } from "./queries";

function App() {
  const { loading, error, data } = useQuery(GET_GRAPH, {
    variables: { userName: "Jack-Cannon" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  var processedData: any = [];

  var semiFlat = data.user.contributionsCollection.contributionCalendar.weeks;
  semiFlat.forEach((x: any) => {
    processedData = [...processedData, x.contributionDays];
  });

  var contributions = processedData.flat();

  var contributionValues: any = contributions
    .map((x: any) => (x = { date: x.date, count: x.contributionCount }))
    .filter((x: any) => x.count !== 0);

  return <div>hey</div>;
}

export default App;
