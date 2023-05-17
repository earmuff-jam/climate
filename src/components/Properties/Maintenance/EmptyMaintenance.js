const EmptyMaintenance = () => {
  return (
    <div>
      <h4 className="text-lg md:text-lg text-center">
        Sorry no matching records found.
      </h4>
      <p className="text-center">
        If you do not have any properties,{" "}
        <a href={"/properties"}>add properties and get started.</a>
      </p>
    </div>
  );
};

export default EmptyMaintenance;
