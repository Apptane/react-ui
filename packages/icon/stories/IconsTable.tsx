import { Glyphs, Icon, Text } from "@apptane/react-ui";
import { css } from "@emotion/react";

const styleIconsTable = css`
  flex: 1 1 100%;
  border-spacing: 0;
  border-collapse: collapse;

  tr > th {
    text-align: left;
  }

  tbody > tr > td {
    padding: 8px 24px;
    vertical-align: middle;
  }

  thead > tr > td {
    text-align: center;
  }
`;

export const IconsTable = () => {
  return (
    <table css={styleIconsTable}>
      <thead>
        <tr>
          <th>
            <Text>Name</Text>
          </th>
          <td>
            <Text>16px</Text>
          </td>
          <td>
            <Text>24px</Text>
          </td>
          <td>
            <Text>32px</Text>
          </td>
          <td>
            <Text>40px</Text>
          </td>
          <td>
            <Text>48px</Text>
          </td>
        </tr>
      </thead>
      <tbody>
        {Object.keys(Glyphs).map((key) => (
          <tr key={key}>
            <th>
              <Text>{key}</Text>
            </th>
            <td>
              <Icon name={"i:" + key} size={16} />
            </td>
            <td>
              <Icon name={"i:" + key} size={24} />
            </td>
            <td>
              <Icon name={"i:" + key} size={32} />
            </td>
            <td>
              <Icon name={"i:" + key} size={40} />
            </td>
            <td>
              <Icon name={"i:" + key} size={48} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
