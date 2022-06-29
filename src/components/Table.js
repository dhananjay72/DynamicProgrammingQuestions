import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import tableData from "../constants/output";
// import "./table.css";

import { useState, useEffect } from "react";

const getLocalItems = () => {
  let dpList = localStorage.getItem("dpList");
  if (dpList) return JSON.parse(dpList);
  else return new Array(tableData.length).fill(false);
};

const dp = Array(26);
dp[12] = "orange";
dp[4] = "green";
dp[7] = "red";

export const TableF = () => {
  const [isSolved, setIsSolved] = useState(getLocalItems);
  const [solvedQuestions, setSolvedQuestions] = useState(0);

  useEffect(() => {
    setSolvedQuestions(isSolved.filter((value) => value === true).length);
  }, []);

  useEffect(() => {
    localStorage.setItem("dpList", JSON.stringify(isSolved));
  }, [isSolved]);

  return (
    <div style={{ width: "100%" }}>
      <div
        className="gradient-border"
        id="box"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2> {solvedQuestions} / 212 solved </h2>
      </div>
      <hr />
      <TableContainer>
        <Table
          sx={{
            width: 500,
            margin: "auto",
            minWidth: 650,
            boxShadow: "0 0 2px 2px #9E9E9E",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>
                  <b>Sr.no</b>
                </h3>
              </TableCell>
              <TableCell>
                <h3>
                  <b>Questions</b>
                </h3>
              </TableCell>
              <TableCell>
                <h3>
                  <b>Category</b>
                </h3>
              </TableCell>
              <TableCell>
                <h3>
                  <b>Difficulty</b>
                </h3>
              </TableCell>
              <TableCell>
                <h3>
                  <b>Solved</b>
                </h3>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, index) =>
              row.Title ? (
                <TableRow
                  style={{
                    backgroundColor: isSolved[index] ? "#7FFF7F" : "",
                    color: "white",
                    width: "20%",
                  }}
                >
                  <TableCell>{(index + 1) / 2}</TableCell>
                  <TableCell>
                    <a href={row.URL} target="_blank" rel="noreferrer">
                      {row.Title}
                    </a>
                  </TableCell>
                  <TableCell>{row.Category}</TableCell>
                  <TableCell
                    style={{
                      color: dp[row.Difficulty.charCodeAt(0) - 65],
                    }}
                  >
                    {row.Difficulty}
                  </TableCell>
                  <TableCell>
                    {isSolved[index] ? (
                      <Checkbox
                        defaultChecked
                        onChange={() => {
                          let tt = [...isSolved];
                          console.log(tt[index], solvedQuestions);

                          if (!tt[index])
                            setSolvedQuestions(solvedQuestions + 1);
                          else setSolvedQuestions(solvedQuestions - 1);
                          tt[index] = !tt[index];
                          setIsSolved(tt);
                        }}
                      />
                    ) : (
                      <Checkbox
                        onChange={() => {
                          let tt = [...isSolved];
                          if (!tt[index])
                            setSolvedQuestions(solvedQuestions + 1);
                          else setSolvedQuestions(solvedQuestions - 1);
                          tt[index] = !tt[index];
                          setIsSolved(tt);
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : // <tableRow
              //   number={index}
              //   URL={row.URL}
              //   Name={row.Name}
              //   Difficulty={row.Difficulty}
              // />
              null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
