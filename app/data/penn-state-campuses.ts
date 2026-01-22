export const PENN_STATE_CAMPUSES = [
  "Penn State University Park",
  "Penn State Abington",
  "Penn State Altoona",
  "Penn State Beaver",
  "Penn State Berks",
  "Penn State Brandywine",
  "Penn State DuBois",
  "Penn State Erie, The Behrend College",
  "Penn State Fayette, The Eberly Campus",
  "Penn State Greater Allegheny",
  "Penn State Harrisburg",
  "Penn State Hazleton",
  "Penn State Lehigh Valley",
  "Penn State Mont Alto",
  "Penn State New Kensington",
  "Penn State Schuylkill",
  "Penn State Shenango",
  "Penn State Wilkes-Barre",
  "Penn State Worthington Scranton",
  "Penn State York",
] as const;

export type PennStateCampus = (typeof PENN_STATE_CAMPUSES)[number];
