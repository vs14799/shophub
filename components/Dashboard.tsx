import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Role } from '../types';
import { ROLE_CONFIGS } from '../constants';
import { 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Home, 
  ExternalLink, 
  Package, 
  ShoppingCart, 
  Users as UsersIcon, 
  BarChart3, 
  Plus, 
  Search, 
  MoreVertical, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Image as ImageIcon,
  Upload,
  X,
  Trash2,
  Box,
  Truck,
  ShieldCheck,
  RefreshCw,
  ArrowUpDown,
  Edit,
  IndianRupee
} from 'lucide-react';
import { getAIAssistance } from '../services/geminiService';
import { Product } from './CustomerStorefront';

interface DashboardProps {
  user: User;
  products: Product[];
  setProducts: (updatedProducts: Product[]) => void;
  onLogout: () => void;
}

type AdminView = 'Dashboard' | 'Products' | 'Orders' | 'Users' | 'Statistics';

const Dashboard: React.FC<DashboardProps> = ({ user, products, setProducts, onLogout }) => {
  const [activeView, setActiveView] = useState<AdminView>('Dashboard');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const config = ROLE_CONFIGS[user.role];

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    displayTitle: '',
    productNumber: '',
    category: 'Electronics',
    subCategory: '',
    material: 'Gold', // Metadata for Jewellery Portal
    brandCategory: 'phone', // Metadata for Electronics Portal
    shortDescription: '',
    status: 'Active',
    salePrice: '',
    initialStock: '',
    mainImage: null as File | string | null,
    additionalImages: [] as (File | string)[]
  });

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    const response = await getAIAssistance(user.role, aiQuery);
    setAiResponse(response || "No response received.");
    setIsAiLoading(false);
    setAiQuery('');
  };

  const handleEditInit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      displayTitle: product.name,
      productNumber: `SKU-${product.id}`,
      category: product.category,
      subCategory: product.subCategory,
      material: product.material || 'Gold',
      brandCategory: product.brandCategory || 'phone',
      shortDescription: product.description,
      status: product.trending ? 'Active' : 'Draft',
      salePrice: product.price.replace(/[^\d]/g, ''),
      initialStock: '100',
      mainImage: product.images[0],
      additionalImages: product.images.slice(1)
    });
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to decommission this artifact from the registry?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Support all image formats via Object URL
    const mainImageUrl = productForm.mainImage 
      ? (typeof productForm.mainImage === 'string' ? productForm.mainImage : URL.createObjectURL(productForm.mainImage))
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800';

    const additionalImageUrls = productForm.additionalImages.map(img => 
      typeof img === 'string' ? img : URL.createObjectURL(img as File)
    );

    const finalImages = [mainImageUrl, ...additionalImageUrls];

    if (editingProduct) {
      // Commit Changes logic: Save and update global state
      const updated = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: productForm.name,
            category: productForm.category,
            subCategory: productForm.subCategory,
            material: productForm.category === 'Jewellery' ? productForm.material : p.material,
            brandCategory: productForm.category === 'Electronics' ? productForm.brandCategory : p.brandCategory,
            price: `₹${parseInt(productForm.salePrice).toLocaleString()}`,
            description: productForm.shortDescription,
            images: finalImages,
            trending: productForm.status === 'Active'
          };
        }
        return p;
      });
      setProducts(updated);
    } else {
      // Register Artifact logic: Save and add to global state
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1001;
      const newProduct: Product = {
        id: newId,
        name: productForm.name,
        category: productForm.category,
        subCategory: productForm.subCategory,
        material: productForm.category === 'Jewellery' ? productForm.material : undefined,
        brandCategory: productForm.category === 'Electronics' ? productForm.brandCategory : undefined,
        price: `₹${parseInt(productForm.salePrice).toLocaleString()}`,
        rating: 5.0,
        images: finalImages,
        tag: 'New',
        trending: productForm.status === 'Active',
        description: productForm.shortDescription,
        specs: ['Authentic', 'New Arrival'],
        reviews: []
      };
      setProducts([newProduct, ...products]);
    }

    // Reset and close
    setIsAddingProduct(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      displayTitle: '',
      productNumber: '',
      category: 'Electronics',
      subCategory: '',
      material: 'Gold',
      brandCategory: 'phone',
      shortDescription: '',
      status: 'Active',
      salePrice: '',
      initialStock: '',
      mainImage: null,
      additionalImages: []
    });
  };

  const renderDashboardOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹42.8L', trend: '+12.5%', up: true, icon: <IndianRupee className="w-5 h-5 text-emerald-400" /> },
          { label: 'Active Sessions', value: '1,284', trend: '+5.2%', up: true, icon: <UsersIcon className="w-5 h-5 text-indigo-400" /> },
          { label: 'Orders Processed', value: '852', trend: '-2.1%', up: false, icon: <ShoppingCart className="w-5 h-5 text-amber-400" /> },
          { label: 'System Uptime', value: '99.98%', trend: 'Stable', up: true, icon: <CheckCircle2 className="w-5 h-5 text-blue-400" /> },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">{stat.icon}</div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Resource Allocation</h3>
            <button className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Live Monitor</button>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Compute Power', value: 34, color: 'bg-indigo-500' },
              { label: 'Nexus Storage', value: 62, color: 'bg-emerald-500' },
              { label: 'Traffic Bandwidth', value: 12, color: 'bg-amber-500' },
            ].map((metric, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-slate-500">{metric.label}</span>
                  <span className="text-white">{metric.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${metric.color} transition-all duration-1000`} style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Recent System Logs</h3>
            <button className="text-xs text-slate-500 font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { text: 'Auth Protocol Updated to v3.5', time: '12m ago', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
              { text: 'Anomaly detected in node sequence #82', time: '1h ago', icon: <AlertCircle className="w-4 h-4 text-amber-400" /> },
              { text: 'Backup sequence 0x42 completed', time: '4h ago', icon: <RefreshCw className="w-4 h-4 text-blue-400" /> },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all">
                <div className="shrink-0">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{activity.text}</p>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddProductForm = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors glass px-6 py-3 rounded-full border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Inventory</span>
        </button>
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
          {editingProduct ? 'Recalibrate' : 'Manifest New'} <span className="text-indigo-400">Artifact</span>
        </h3>
      </div>

      <form onSubmit={handleProductSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* General Information */}
          <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-8">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-indigo-400" />
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Identity Core</h4>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({...productForm, name: e.target.value})}
                  placeholder="e.g. iPhone 15 Pro Max" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Display Title</label>
                <input 
                  type="text" 
                  required
                  value={productForm.displayTitle}
                  onChange={e => setProductForm({...productForm, displayTitle: e.target.value})}
                  placeholder="Premium Marketing Heading" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Product Number</label>
                  <input 
                    type="text" 
                    required
                    value={productForm.productNumber}
                    onChange={e => setProductForm({...productForm, productNumber: e.target.value})}
                    placeholder="SKU-88921" 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Status Registry</label>
                  <select 
                    value={productForm.status}
                    onChange={e => setProductForm({...productForm, status: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white appearance-none cursor-pointer"
                  >
                    <option value="Active">Active Portal</option>
                    <option value="Inactive">Suspended</option>
                    <option value="Draft">Draft Registry</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Categorization & Logistics */}
          <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-8">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-indigo-400" />
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Taxonomy & Value</h4>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category</label>
                  <select 
                    value={productForm.category}
                    onChange={e => setProductForm({...productForm, category: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white appearance-none cursor-pointer"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Sub Category</label>
                  <input 
                    type="text" 
                    required
                    value={productForm.subCategory}
                    onChange={e => setProductForm({...productForm, subCategory: e.target.value})}
                    placeholder="e.g. Smart Devices" 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white"
                  />
                </div>
              </div>

              {/* Portal Mapping Fields */}
              <div className="grid grid-cols-2 gap-6">
                 {productForm.category === 'Jewellery' ? (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Material (Jewellery Portal)</label>
                      <select 
                        value={productForm.material}
                        onChange={e => setProductForm({...productForm, material: e.target.value})}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white appearance-none cursor-pointer"
                      >
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Rose Gold">Rose Gold</option>
                        <option value="Diamond">Diamond</option>
                      </select>
                    </div>
                 ) : productForm.category === 'Electronics' ? (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Classification (Electronics Portal)</label>
                      <select 
                        value={productForm.brandCategory}
                        onChange={e => setProductForm({...productForm, brandCategory: e.target.value})}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white appearance-none cursor-pointer"
                      >
                        <option value="phone">Smartphone</option>
                        <option value="laptop">Laptop</option>
                        <option value="headphone">Headphone</option>
                        <option value="Bluetooth speaker">Bluetooth Speaker</option>
                        <option value="ear buds">Ear Buds</option>
                        <option value="speakers">Party Speaker</option>
                        <option value="others">Other Assets</option>
                      </select>
                    </div>
                 ) : <div />}

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Sale Price (₹)</label>
                    <input 
                      type="number" 
                      required
                      value={productForm.salePrice}
                      onChange={e => setProductForm({...productForm, salePrice: e.target.value})}
                      placeholder="0.00" 
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white"
                    />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Initial Stock</label>
                  <input 
                    type="number" 
                    required
                    value={productForm.initialStock}
                    onChange={e => setProductForm({...productForm, initialStock: e.target.value})}
                    placeholder="0" 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Short Description</label>
                  <textarea 
                    required
                    value={productForm.shortDescription}
                    onChange={e => setProductForm({...productForm, shortDescription: e.target.value})}
                    rows={2}
                    placeholder="Key artifact highlights..." 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-indigo-500/50 text-white resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Management */}
        <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-10">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-5 h-5 text-indigo-400" />
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">Visual Artifacts</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Hero Asset (All Formats)</label>
               <div className="aspect-square glass rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden group">
                  {productForm.mainImage ? (
                    <img 
                      src={typeof productForm.mainImage === 'string' ? productForm.mainImage : URL.createObjectURL(productForm.mainImage)} 
                      className="w-full h-full object-cover" 
                      alt="Primary" 
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                      <p className="text-[10px] font-black uppercase text-slate-600 group-hover:text-slate-400 transition-colors">Select Asset</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        setProductForm({...productForm, mainImage: e.target.files[0]});
                      }
                    }}
                  />
               </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Supporting Perspectives</label>
               <div className="flex flex-wrap gap-6">
                  {productForm.additionalImages.map((img, idx) => (
                    <div key={idx} className="w-24 h-24 glass rounded-2xl border border-white/10 overflow-hidden relative group">
                       <img 
                        src={typeof img === 'string' ? img : URL.createObjectURL(img as File)} 
                        className="w-full h-full object-cover" 
                        alt="" 
                       />
                       <button 
                        type="button"
                        onClick={() => {
                          const newImages = [...productForm.additionalImages];
                          newImages.splice(idx, 1);
                          setProductForm({...productForm, additionalImages: newImages});
                        }}
                        className="absolute top-1 right-1 p-1 bg-rose-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         <X className="w-3 h-3 text-white" />
                       </button>
                    </div>
                  ))}
                  <div className="w-24 h-24 glass rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center hover:border-indigo-500/30 transition-all cursor-pointer relative group">
                     <Plus className="w-6 h-6 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                     <input 
                      type="file" 
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files) {
                          setProductForm({
                            ...productForm, 
                            additionalImages: [...productForm.additionalImages, ...Array.from(e.target.files)]
                          });
                        }
                      }}
                     />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6 pt-10">
           <button 
            type="button" 
            onClick={() => { setIsAddingProduct(false); setEditingProduct(null); }}
            className="px-10 py-5 glass rounded-3xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all border border-white/5"
           >
             Cancel Protocol
           </button>
           <button 
            type="submit"
            className="px-12 py-5 bg-indigo-600 rounded-3xl text-xs font-black uppercase tracking-widest text-white shadow-2xl hover:bg-indigo-500 transition-all active:scale-95"
           >
             {editingProduct ? 'Commit Changes' : 'Register Artifact'}
           </button>
        </div>
      </form>
    </div>
  );

  const renderProductManagement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {isAddingProduct ? renderAddProductForm() : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 glass rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 border border-white/5">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button 
                onClick={() => { setIsAddingProduct(true); setEditingProduct(null); }}
                className="px-6 py-3 bg-indigo-600 rounded-2xl text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
          </div>

          <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-white/5 bg-white/5">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Artifact</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Registry Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Units</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Value</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5">
                          <img src={p.images[0]} className="w-full h-full object-cover" alt={p.name} />
                        </div>
                        <div className="flex flex-col">
                           <p className="text-white font-bold">{p.name}</p>
                           <p className="text-slate-500 text-[9px] uppercase tracking-widest">{p.category} • {p.subCategory}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        p.trending ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>{p.trending ? 'Trending' : 'Active'}</span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-slate-300 font-bold">100 units</p>
                    </td>
                    <td className="px-8 py-5 text-white font-black">{p.price}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEditInit(p)}
                          className="p-2 text-slate-500 hover:text-indigo-400 transition-colors"
                          title="Recalibrate"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
                          title="Decommission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );

  const renderOrderManagement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
           <h3 className="text-xl font-bold">Transaction Registry</h3>
           <div className="flex gap-4">
              <button className="px-4 py-2 glass rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 border border-white/5">Export Manifest</button>
           </div>
        </div>
        <div className="divide-y divide-white/5">
           {[
             { id: 'SH-92834', customer: 'Sarah Jenkins', total: '₹1.2L', date: 'Oct 24, 2024', status: 'Shipped' },
             { id: 'SH-92835', customer: 'Michael Ross', total: '₹45k', date: 'Oct 24, 2024', status: 'Processing' },
             { id: 'SH-92836', customer: 'Elena Vance', total: '₹2.1L', date: 'Oct 23, 2024', status: 'Delivered' },
           ].map((order) => (
             <div key={order.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center gap-8">
                   <div>
                      <p className="text-white font-bold tracking-tight uppercase">Order {order.id}</p>
                      <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">{order.date}</p>
                   </div>
                   <div>
                      <p className="text-slate-300 font-medium text-sm">{order.customer}</p>
                   </div>
                </div>
                <div className="flex items-center gap-12">
                   <p className="text-white font-black">{order.total}</p>
                   <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                     order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                     'bg-blue-500/10 text-blue-400 border-blue-500/20'
                   }`}>{order.status}</div>
                   <button className="text-slate-500 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
           <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <UsersIcon className="w-8 h-8 text-indigo-400" />
           </div>
           <div>
              <p className="text-3xl font-black text-white">4,281</p>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Citizens Registered</p>
           </div>
        </div>
        <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
           <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <UserCheckIcon className="w-8 h-8 text-emerald-400" />
           </div>
           <div>
              <p className="text-3xl font-black text-white">842</p>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Verified Hubs</p>
           </div>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
           <h3 className="text-xl font-bold">Node Directory</h3>
        </div>
        <div className="divide-y divide-white/5">
           {[
             { name: 'Sarah Jenkins', email: 'sarah.j@node.io', role: 'Premium Customer', activity: '2h ago' },
             { name: 'Michael Ross', email: 'mike.r@corp.com', role: 'Staff Seller', activity: '12h ago' },
             { name: 'Elena Vance', email: 'vance.e@citadel.org', role: 'Analyst', activity: 'Yesterday' },
           ].map((u, i) => (
             <div key={i} className="p-6 flex items-center justify-between group hover:bg-white/[0.01]">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-black uppercase">
                      {u.name.charAt(0)}
                   </div>
                   <div>
                      <p className="text-white font-bold">{u.name}</p>
                      <p className="text-slate-500 text-xs">{u.email}</p>
                   </div>
                </div>
                <div className="flex items-center gap-12">
                   <span className="px-4 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400">{u.role}</span>
                   <div className="text-right min-w-[100px]">
                      <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Last Auth</p>
                      <p className="text-xs text-slate-400 font-bold">{u.activity}</p>
                   </div>
                   <button className="p-2 text-slate-600 hover:text-white"><Settings className="w-4 h-4" /></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="glass p-10 rounded-[3.5rem] border border-white/5 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Performance <span className="text-indigo-400">Velocity</span></h3>
             <div className="flex gap-4">
                {['Day', 'Week', 'Month', 'Year'].map(t => (
                  <button key={t} className={`px-4 py-1.5 rounded-xl text-[10px] font-black ${t === 'Month' ? 'bg-indigo-600 text-white' : 'glass text-slate-500'}`}>{t}</button>
                ))}
             </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-2">
             {[34, 52, 45, 68, 85, 42, 38, 55, 72, 90, 65, 48].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className={`w-full rounded-t-xl transition-all duration-1000 bg-gradient-to-t from-indigo-600/20 to-indigo-500 group-hover:brightness-125`} style={{ height: `${h}%` }} />
                  <span className="text-[8px] font-black text-slate-700 uppercase tracking-tighter">P-{i+1}</span>
               </div>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Retention Score', val: '92.4%', icon: <TrendingUp className="text-emerald-400" /> },
            { label: 'Conversion Rate', val: '4.8%', icon: <ArrowUpRight className="text-indigo-400" /> },
            { label: 'Avg Session', val: '12m 42s', icon: <Clock className="text-amber-400" /> },
          ].map((s, i) => (
            <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-4">
               <div className="flex justify-between items-center">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                  {s.icon}
               </div>
               <p className="text-4xl font-black text-white">{s.val}</p>
            </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 glass border-r border-white/5 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">ShopHub <span className="text-indigo-500">3.0</span></h2>
          </Link>
        </div>
        
        <nav className="flex-1 px-6 space-y-2">
          <div className="pt-2 pb-2 px-4">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Administrative Console</p>
          </div>

          {[
            { id: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: 'Products', icon: <Package className="w-5 h-5" /> },
            { id: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
            { id: 'Users', icon: <UsersIcon className="w-5 h-5" /> },
            { id: 'Statistics', icon: <BarChart3 className="w-5 h-5" /> },
          ].map((nav) => (
            <button 
              key={nav.id}
              onClick={() => { setActiveView(nav.id as AdminView); setIsAddingProduct(false); setEditingProduct(null); }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                activeView === nav.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/10' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {nav.icon}
              <span className="font-bold text-sm tracking-tight">{nav.id}</span>
            </button>
          ))}
          
          <div className="pt-6 pb-2 px-4 border-t border-white/5 mt-6">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Hub Viewports</p>
          </div>

          <Link to="/" className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Home className="w-5 h-5" />
            <span className="font-bold text-sm tracking-tight">System Gateway</span>
          </Link>

          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <ExternalLink className="w-5 h-5" />
            <span className="font-bold text-sm tracking-tight">Public Storefront</span>
          </button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all font-bold"
          >
            <LogOut className="w-5 h-5" />
            <span>De-authorize Access</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${config.gradientClass} text-white`}>
                Nexus Auth Level: Admin
              </span>
              <span className="text-slate-700 font-bold">/</span>
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{activeView} {isAddingProduct ? (editingProduct ? 'Recalibration' : 'Creation') : 'Portal'}</span>
            </div>
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Nexus <span className="text-indigo-500">Console</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-white font-black uppercase tracking-widest text-xs">{user.fullName}</p>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest opacity-50">Auth Level: Omega-9</p>
             </div>
             <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.gradientClass} border border-white/10 shadow-lg flex items-center justify-center text-white font-black uppercase text-xl`}>
                {user.fullName.charAt(0)}
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 items-start">
          <div className="xl:col-span-3 space-y-12 pb-20">
            {activeView === 'Dashboard' && renderDashboardOverview()}
            {activeView === 'Products' && renderProductManagement()}
            {activeView === 'Orders' && renderOrderManagement()}
            {activeView === 'Users' && renderUserManagement()}
            {activeView === 'Statistics' && renderStatistics()}
          </div>

          {/* AI Sidebar */}
          <div className="space-y-8 sticky top-12">
            <div className="glass p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3 italic uppercase tracking-tighter">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                    Nexus AI
                  </h3>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-1">Intelligence Assistant</p>
                </div>

                <div className="flex-1 space-y-4 mb-6 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                  {aiResponse ? (
                    <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 animate-in fade-in slide-in-from-bottom-2">
                      <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{aiResponse}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                        <MessageSquare className="text-slate-700 w-8 h-8" />
                      </div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Awaiting Nexus Directive...</p>
                    </div>
                  )}
                  {isAiLoading && (
                    <div className="flex justify-center py-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAiConsult} className="mt-auto relative">
                  <input
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Enter Command..."
                    className="w-full bg-slate-950/80 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-700"
                  />
                  <button 
                    disabled={isAiLoading}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${config.buttonClass} text-white shadow-lg active:scale-95 disabled:opacity-50`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] opacity-50">System Overrides</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Panic Mode', color: 'hover:text-rose-500' },
                  { label: 'Flush Cache', color: 'hover:text-emerald-500' },
                  { label: 'Audit Trail', color: 'hover:text-blue-400' },
                  { label: 'Re-Auth All', color: 'hover:text-indigo-400' },
                ].map((btn, i) => (
                  <button key={i} className={`p-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-500 transition-all active:scale-95 border border-white/5 ${btn.color}`}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const UserCheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
  </svg>
);

export default Dashboard;