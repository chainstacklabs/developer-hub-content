import { gql } from "@apollo/client";

export const pairSymbolsQuery = gql`
  {
    pairs {
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
`;
