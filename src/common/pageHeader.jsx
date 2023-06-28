export function PageHeader({ title, description }){
  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <h1 className="mx-auto">{title}</h1>
        </div>
      </div>

      {description && (
        <div className="row mt-2">
          <div className="col-12">
            <p>{description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeader;
