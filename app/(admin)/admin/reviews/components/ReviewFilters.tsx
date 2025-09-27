interface ReviewFiltersProps {
  statusFilter: string;
  typeFilter: string;
  search: string;
  onStatusChange: (status: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
  onPageReset: () => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  statusFilter,
  typeFilter,
  search,
  onStatusChange,
  onTypeChange,
  onSearchChange,
  onPageReset,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageReset();
    onStatusChange(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageReset();
    onTypeChange(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPageReset();
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Status:</label>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border border-gray-300 bg-white focus:outline-none pl-2 h-[35px] rounded-[4px] text-sm"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Type:</label>
        <select
          value={typeFilter}
          onChange={handleTypeChange}
          className="border border-gray-300 bg-white focus:outline-none pl-2 h-[35px] rounded-[4px] text-sm"
        >
          <option value="ALL">All Types</option>
          <option value="LAND">Land Reviews</option>
          <option value="HOUSE">House Reviews</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Search:</label>
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 bg-white focus:outline-none pl-2 h-[35px] w-[150px] rounded-[4px] text-sm"
        />
      </div>
    </div>
  );
};

export default ReviewFilters;
