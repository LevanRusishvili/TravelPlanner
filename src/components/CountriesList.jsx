// import { useSelector } from "react-redux";

// const CountriesList = () => {
//   const { countries, loading, error } = useSelector((state) => state.countries);

//   if (loading) {
//     return <div>Loading countries...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (countries.length === 0) {
//     return <p>No countries loaded yet.</p>;
//   }

//   return (
//     <div>
//       <h4>Available Countries ({countries.length})</h4>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {countries.slice(0, 10).map((country) => (
//           <li
//             key={country.cca2}
//             style={{
//               padding: "10px",
//               margin: "5px 0",
//               border: "1px solid #eee",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={country.flags.png}
//               alt={country.name.common}
//               style={{ width: "30px", marginRight: "10px" }}
//             />
//             <span>{country.name.common}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CountriesList;
