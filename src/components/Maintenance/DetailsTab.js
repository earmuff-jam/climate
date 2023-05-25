import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
} from "@material-tailwind/react";

const DetailsTab = (props) => {
  const { form, handleChange, selected, setSelected } = props;

  console.log(form);
  return (
    <Tabs value={selected} className="flex w-full flex-col">
      <TabsHeader className="flex flex-row gap-2 justify-center align-center px-10">
        {form.map(({ id, label, title }) => (
          <Tab key={id} value={label} onClick={() => setSelected(label)}>
            {title}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {form.map(({ id, data, label }) => {
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
                  onChange={handleChange}
                />
                <Textarea
                  variant={description.variant}
                  label={description.label}
                  name={description.name}
                  error={description.errorMsg.length ?? false}
                  onChange={handleChange}
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
