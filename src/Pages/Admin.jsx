/**
 * Admin Dashboard
 * Comprehensive admin interface for managing orders with analytics and functionality
 * Features: Order management, status updates, analytics, filtering, pagination
 */

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBox,
  FaDollarSign,
  FaShoppingCart,
  FaEye,
  FaEdit,
  FaFilter,
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaTruck,
  FaChartLine,
  FaDownload,
  FaSyncAlt,
} from "react-icons/fa";

// Redux Actions
import {
  getAllOrders,
  updateOrderStatus,
  getAnalytics,
} from "../features/admin/adminSlice.js";

// Header and Footer Importing
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";

// ==============================
// Constants & Configuration
// ==============================

/** Order status options for filtering and updating */
const ORDER_STATUSES = [
  { value: "Pending", label: "Pending", color: "yellow", icon: FaClock },
  { value: "Processing", label: "Processing", color: "blue", icon: FaBox },
  { value: "Shipped", label: "Shipped", color: "purple", icon: FaTruck },
  {
    value: "Delivered",
    label: "Delivered",
    color: "green",
    icon: FaCheckCircle,
  },
  { value: "Cancelled", label: "Cancelled", color: "red", icon: FaTimes },
];

/** Payment status configurations */
const PAYMENT_STATUSES = [
  { value: "Pending", label: "Pending", color: "yellow" },
  { value: "Completed", label: "Completed", color: "green" },
  { value: "Failed", label: "Failed", color: "red" },
];

/** Items per page options */
const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

/**
 * Admin Dashboard Component
 * @returns {JSX.Element} Complete admin dashboard
 */
const Admin = () => {
  // ==============================
  // Hooks & State
  // ==============================
  const dispatch = useDispatch();

  // Redux State
  const { allOrders, analyticsData, isLoading, isError, errorMessage } =
    useSelector((state) => state.admin);
  const { primaryBg, primaryText } = useSelector(
    (state) => state.colors.colors
  );

  // Local State - Streamlined for API-based filtering and pagination
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    dateFrom: "",
    dateTo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // ==============================
  // Memoized Values
  // ==============================

  /** Detect dark mode */
  const isDarkMode = useMemo(
    () => primaryBg === "#000000" || primaryBg === "#000",
    [primaryBg]
  );

  /** Card styling with improved dark mode support */
  const cardStyles = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      color: isDarkMode ? "#e5e7eb" : "#374151",
    }),
    [isDarkMode]
  );

  /** Input styling with improved dark mode support */
  const inputStyles = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#374151" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#4b5563" : "#d1d5db"}`,
      color: isDarkMode ? "#e5e7eb" : "#374151",
    }),
    [isDarkMode]
  );

  /** Modal styling */
  const modalStyles = useMemo(
    () => ({
      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
    }),
    [isDarkMode]
  );

  /** Filter and process orders - Now handled by API */
  const processedOrders = useMemo(() => {
    // Handle the exact API response structure from getAllOrders controller
    const ordersData = allOrders?.data?.orders || allOrders?.orders || [];
    if (!Array.isArray(ordersData)) return [];

    // API already handles filtering and sorting, just return the orders
    return ordersData;
  }, [allOrders]);

  /** Paginated orders - Now handled by API */
  const paginatedOrders = useMemo(() => {
    // API handles pagination, so return all orders from current response
    return processedOrders;
  }, [processedOrders]);

  /** Total pages - removed as we calculate it directly in renderPagination */

  // ==============================
  // Effects
  // ==============================

  useEffect(() => {
    // Debounce API calls to prevent excessive requests
    const timeoutId = setTimeout(() => {
      const filterParams = {
        page: currentPage,
        limit: itemsPerPage,
        ...(filters.status && { status: filters.status }),
        ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      };

      dispatch(getAllOrders(filterParams));
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [dispatch, currentPage, itemsPerPage, filters]);

  // Load analytics separately (only once)
  useEffect(() => {
    if (!analyticsData) {
      dispatch(getAnalytics("30"));
    }
  }, [dispatch, analyticsData]);

  // ==============================
  // Event Handlers
  // ==============================

  /**
   * Handle order status update
   */
  const handleUpdateOrderStatus = useCallback(
    (orderId, newStatus) => {
      if (!orderId || !newStatus) {
        console.error("Invalid order ID or status");
        return;
      }

      dispatch(updateOrderStatus({ id: orderId, orderStatus: newStatus }));
      setSelectedOrder(null);
      setShowOrderModal(false);

      // Refresh orders after update with current filters
      setTimeout(() => {
        try {
          const filterParams = {
            page: currentPage,
            limit: itemsPerPage,
            ...(filters.status && { status: filters.status }),
            ...(filters.paymentStatus && {
              paymentStatus: filters.paymentStatus,
            }),
            ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
            ...(filters.dateTo && { dateTo: filters.dateTo }),
          };
          dispatch(getAllOrders(filterParams));
        } catch (error) {
          console.error("Error refreshing orders:", error);
        }
      }, 1000);
    },
    [dispatch, currentPage, itemsPerPage, filters]
  );

  /**
   * Handle filter changes
   */
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      status: "",
      paymentStatus: "",
      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(1);
  }, []);

  /**
   * Handle page change
   */
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  /**
   * Handle order view
   */
  const handleViewOrder = useCallback((order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  }, []);

  /**
   * Format currency
   */
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }, []);

  /**
   * Format date
   */
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleString();
  }, []);

  /**
   * Get status color
   */
  const getStatusColor = useCallback((status, type = "order") => {
    const statuses = type === "payment" ? PAYMENT_STATUSES : ORDER_STATUSES;
    const statusObj = statuses.find((s) => s.value === status);
    return statusObj?.color || "gray";
  }, []);

  // ==============================
  // Render Methods
  // ==============================

  /**
   * Render analytics cards
   */
  const renderAnalyticsCards = () => {
    // Calculate stats from analytics data with error handling
    let totalRevenue = 0;
    let totalOrders = 0;
    let averageOrderValue = 0;

    try {
      // First try to get stats from getAllOrders response
      if (allOrders?.data?.stats) {
        const stats = allOrders.data.stats;
        totalRevenue = stats.totalRevenue || 0;
        totalOrders = stats.totalOrders || 0;
        averageOrderValue = stats.averageOrderValue || 0;
      }
      // Fallback to analytics data if available
      else if (
        analyticsData?.data?.analytics &&
        Array.isArray(analyticsData.data.analytics)
      ) {
        analyticsData.data.analytics.forEach((item) => {
          if (
            item &&
            typeof item.revenue === "number" &&
            typeof item.count === "number"
          ) {
            totalRevenue += item.revenue;
            totalOrders += item.count;
          }
        });

        if (totalOrders > 0) {
          averageOrderValue = totalRevenue / totalOrders;
        }
      }
      // Direct analytics data structure
      else if (
        analyticsData?.analytics &&
        Array.isArray(analyticsData.analytics)
      ) {
        analyticsData.analytics.forEach((item) => {
          if (
            item &&
            typeof item.revenue === "number" &&
            typeof item.count === "number"
          ) {
            totalRevenue += item.revenue;
            totalOrders += item.count;
          }
        });

        if (totalOrders > 0) {
          averageOrderValue = totalRevenue / totalOrders;
        }
      }
    } catch (error) {
      console.error("Error calculating analytics:", error);
      // Fallback to zero values if there's an error
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="p-6 rounded-xl shadow-lg" style={cardStyles}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70" style={{ color: primaryText }}>
                Total Revenue (30 days)
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
              <FaDollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-xl shadow-lg" style={cardStyles}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70" style={{ color: primaryText }}>
                Total Orders (30 days)
              </p>
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <FaShoppingCart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="p-6 rounded-xl shadow-lg" style={cardStyles}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70" style={{ color: primaryText }}>
                Average Order Value
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(averageOrderValue)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
              <FaChartLine className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render top products section
   */
  const renderTopProducts = () => {
    // Show loading state if analytics is still loading
    if (isLoading && !analyticsData) {
      return (
        <div className="mb-8 p-6 rounded-xl shadow-lg" style={cardStyles}>
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: primaryText }}
          >
            Top Products (30 days)
          </h3>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      );
    }

    // Handle both nested and direct response structures
    const topProducts =
      analyticsData?.data?.topProducts || analyticsData?.topProducts || [];
    if (!topProducts || topProducts.length === 0) {
      return null;
    }

    return (
      <div className="mb-8 p-6 rounded-xl shadow-lg" style={cardStyles}>
        <h3
          className="text-lg font-semibold mb-6"
          style={{ color: primaryText }}
        >
          Top Products (30 days)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProducts.slice(0, 6).map((product, index) => (
            <div
              key={product._id}
              className="p-4 rounded-lg border"
              style={{
                borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                backgroundColor: isDarkMode ? "#374151" : "#f9fafb",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      #{index + 1}
                    </span>
                  </div>
                  <h4
                    className="font-semibold text-sm mb-2 line-clamp-2"
                    style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
                  >
                    {product.productName}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span
                        style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                      >
                        Quantity Sold:
                      </span>
                      <span className="font-semibold text-blue-600">
                        {product.totalQuantity}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span
                        style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                      >
                        Revenue:
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(product.totalRevenue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Render filters section
   */
  const renderFilters = () => (
    <div className="mb-6 p-6 rounded-xl shadow-lg" style={cardStyles}>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold" style={{ color: primaryText }}>
          Filters
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <FaFilter size={14} />
          {showFilters ? "Hide" : "Show"} Filters
        </button>
        <button
          onClick={clearFilters}
          className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          Clear All
        </button>
        <button
          onClick={() => {
            const filterParams = {
              page: currentPage,
              limit: itemsPerPage,
              ...(filters.status && { status: filters.status }),
              ...(filters.paymentStatus && {
                paymentStatus: filters.paymentStatus,
              }),
              ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
              ...(filters.dateTo && { dateTo: filters.dateTo }),
            };
            dispatch(getAllOrders(filterParams));
            dispatch(getAnalytics("30"));
          }}
          disabled={isLoading}
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
          ) : (
            <FaSyncAlt size={14} />
          )}
          {isLoading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Order Status */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: primaryText }}
            >
              Order Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={inputStyles}
            >
              <option value="">All Statuses</option>
              {ORDER_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: primaryText }}
            >
              Payment Status
            </label>
            <select
              value={filters.paymentStatus}
              onChange={(e) =>
                handleFilterChange("paymentStatus", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={inputStyles}
            >
              <option value="">All Payment Statuses</option>
              {PAYMENT_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: primaryText }}
            >
              Date From
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={inputStyles}
            />
          </div>

          {/* Date To */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: primaryText }}
            >
              Date To
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={inputStyles}
            />
          </div>
        </div>
      )}
    </div>
  );

  /**
   * Render orders table
   */
  const renderOrdersTable = () => (
    <div className="overflow-hidden rounded-xl shadow-lg" style={cardStyles}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold" style={{ color: primaryText }}>
            Orders ({processedOrders.length})
          </h3>
          <div className="flex items-center gap-4">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1 border rounded-lg"
              style={inputStyles}
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
            <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2">
              <FaDownload size={14} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            style={{ backgroundColor: isDarkMode ? "#374151" : "#f9fafb" }}
          >
            <tr>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Order ID
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Customer
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Date
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Items
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Total
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Status
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Payment
              </th>
              <th
                className="text-left px-6 py-4 font-medium"
                style={{ color: primaryText }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id || order._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-blue-600">
                      #{(order.id || order._id || "N/A").toString().slice(-8)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
                      >
                        {order.user?.name || "Unknown Customer"}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                      >
                        {order.user?.email || "No email"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-sm"
                      style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
                    >
                      {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-sm"
                      style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
                    >
                      {order.totalItems || 0} items
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-green-600">
                      {formatCurrency(order.finalAmount || 0)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(
                        order.orderStatus
                      )}-100 text-${getStatusColor(
                        order.orderStatus
                      )}-800 dark:bg-${getStatusColor(
                        order.orderStatus
                      )}-900/20 dark:text-${getStatusColor(
                        order.orderStatus
                      )}-400`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(
                        order.paymentStatus,
                        "payment"
                      )}-100 text-${getStatusColor(
                        order.paymentStatus,
                        "payment"
                      )}-800 dark:bg-${getStatusColor(
                        order.paymentStatus,
                        "payment"
                      )}-900/20 dark:text-${getStatusColor(
                        order.paymentStatus,
                        "payment"
                      )}-400`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                        title="View order details"
                        aria-label={`View details for order ${order.id.slice(
                          -8
                        )}`}
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                        title="Edit order status"
                        aria-label={`Edit status for order ${order.id.slice(
                          -8
                        )}`}
                      >
                        <FaEdit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaBox className="text-gray-400 mb-4" size={48} />
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
                    >
                      No orders found
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                    >
                      {Object.values(filters).some(
                        (filter) =>
                          filter !== "" &&
                          filter !== null &&
                          filter !== undefined
                      )
                        ? "Try adjusting your filters to see more results."
                        : "Orders will appear here once customers start placing orders."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  /**
   * Render pagination
   */
  const renderPagination = () => {
    const totalResults = allOrders?.data?.totalOrders || processedOrders.length;
    const calculatedTotalPages = Math.ceil(totalResults / itemsPerPage);

    // Always show pagination info, even if there's only one page
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div
          className="text-sm"
          style={{ color: isDarkMode ? "#e5e7eb" : "#6b7280" }}
        >
          {totalResults > 0 ? (
            <>
              Showing{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalResults)} to{" "}
              {Math.min(currentPage * itemsPerPage, totalResults)} of{" "}
              {totalResults} results
            </>
          ) : (
            "No results found"
          )}
        </div>

        {calculatedTotalPages > 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              style={{
                ...cardStyles,
                color: isDarkMode ? "#e5e7eb" : "#374151",
              }}
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from(
              { length: Math.min(calculatedTotalPages, 5) },
              (_, i) => {
                let page;
                if (calculatedTotalPages <= 5) {
                  page = i + 1;
                } else {
                  // Smart pagination for many pages
                  if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= calculatedTotalPages - 2) {
                    page = calculatedTotalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded-lg transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    style={
                      currentPage === page
                        ? {}
                        : {
                            ...cardStyles,
                            color: isDarkMode ? "#e5e7eb" : "#374151",
                          }
                    }
                  >
                    {page}
                  </button>
                );
              }
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === calculatedTotalPages}
              className="px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              style={{
                ...cardStyles,
                color: isDarkMode ? "#e5e7eb" : "#374151",
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  /**
   * Render order details modal
   */
  const renderOrderModal = () => {
    if (!showOrderModal || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div
          className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-xl"
          style={modalStyles}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: primaryText }}>
                Order Details #{selectedOrder.id.slice(-8)}
              </h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: primaryText }}
                >
                  Customer Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-gray-400" size={16} />
                    <span style={{ color: primaryText }}>
                      {selectedOrder.user.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-400" size={16} />
                    <span style={{ color: primaryText }}>
                      {selectedOrder.user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-400" size={16} />
                    <span style={{ color: primaryText }}>
                      {selectedOrder.shippingAddress.phone}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gray-400 mt-1" size={16} />
                    <div style={{ color: primaryText }}>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.postalCode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: primaryText }}
                >
                  Order Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span style={{ color: primaryText }}>Order Date:</span>
                    <span style={{ color: primaryText }}>
                      {formatDate(selectedOrder.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: primaryText }}>Payment Method:</span>
                    <span style={{ color: primaryText }}>
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: primaryText }}>Total Items:</span>
                    <span style={{ color: primaryText }}>
                      {selectedOrder.totalItems}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: primaryText }}>Total Amount:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(selectedOrder.finalAmount)}
                    </span>
                  </div>
                </div>

                {/* Status Update */}
                <div className="mt-6">
                  <h4
                    className="text-md font-semibold mb-3"
                    style={{ color: primaryText }}
                  >
                    Update Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ORDER_STATUSES.map((status) => (
                      <button
                        key={status.value}
                        onClick={() =>
                          handleUpdateOrderStatus(
                            selectedOrder.id,
                            status.value
                          )
                        }
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          selectedOrder.orderStatus === status.value
                            ? `bg-${status.color}-600 text-white`
                            : `bg-${status.color}-100 text-${status.color}-800 hover:bg-${status.color}-200 dark:bg-${status.color}-900/20 dark:text-${status.color}-400`
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: primaryText }}
              >
                Order Items
              </h3>
              <div className="space-y-4">
                {selectedOrder.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg"
                    style={{
                      borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                      backgroundColor: isDarkMode ? "#374151" : "#f9fafb",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4
                          className="font-semibold"
                          style={{ color: primaryText }}
                        >
                          {item.productName}
                        </h4>
                        <p className="text-sm opacity-70">
                          Size: {item.size} | Color: {item.color} | Quantity:{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(item.subtotal)}
                        </p>
                        <p className="text-sm opacity-70">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==============================
  // Loading & Error States
  // ==============================

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: primaryBg }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p style={{ color: primaryText }}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: primaryBg }}
      >
        <div
          className="text-center p-8 rounded-xl shadow-lg"
          style={cardStyles}
        >
          <FaTimes className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p style={{ color: primaryText }}>
            {errorMessage || "Failed to load dashboard"}
          </p>
          <button
            onClick={() => {
              const filterParams = {
                page: currentPage,
                limit: itemsPerPage,
                ...(filters.status && { status: filters.status }),
                ...(filters.paymentStatus && {
                  paymentStatus: filters.paymentStatus,
                }),
                ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
                ...(filters.dateTo && { dateTo: filters.dateTo }),
              };
              dispatch(getAllOrders(filterParams));
              dispatch(getAnalytics("30"));
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // Main Render
  // ==============================
  return (
    <>
      <Header />
      <div
        className="min-h-screen p-4 md:p-8"
        style={{ backgroundColor: primaryBg }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: primaryText }}
            >
              Admin Dashboard
            </h1>
            <p className="opacity-70" style={{ color: primaryText }}>
              Manage orders, track performance, and analyze business metrics
            </p>
          </div>

          {/* Analytics Cards */}
          {renderAnalyticsCards()}

          {/* Top Products */}
          {renderTopProducts()}

          {/* Filters */}
          {renderFilters()}

          {/* Orders Table */}
          {renderOrdersTable()}

          {/* Pagination */}
          {renderPagination()}

          {/* Order Details Modal */}
          {renderOrderModal()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
