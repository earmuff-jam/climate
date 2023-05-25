import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDetailsTagConfig } from "./Hooks";

const DetailsTab = () => {
  const { details, selected, setSelected } = useDetailsTagConfig();

  return (
    <Tabs value={selected} className="flex w-full flex-col">
      <TabsHeader className="flex flex-row gap-2 justify-center align-center px-10">
        {details.map(({ id, label, title }) => (
          <Tab key={id} value={label} onClick={() => setSelected(label)}>
            {title}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {details.map(({ id, data, label }) => {
          const details = data["details"];
          const description = data["description"];
          return (
            <TabPanel key={id} value={label}>
              <div className="flex flex-col gap-4">
                <Input
                  variant={details.variant}
                  label={details.label}
                  name={details.name}
                  error={details.errorMsg.length ?? false}
                />
                <Textarea
                  variant={description.variant}
                  label={description.label}
                  name={description.name}
                  error={description.errorMsg.length ?? false}
                />
              </div>
            </TabPanel>
          );
        })}
      </TabsBody>
    </Tabs>
  );
};

export default DetailsTab;
