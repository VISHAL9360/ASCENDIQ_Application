import { useState, useEffect } from 'react';
import { Bell, Check, Loader2, Info, AlertCircle, Calendar } from 'lucide-react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data);
            setUnreadCount(data.filter(n => !n.read).length);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const markRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
            setUnreadCount(prev => prev - 1);
        } catch (err) {
            console.error(err);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'interview_scheduled': return <Calendar className="text-indigo-500" size={16} />;
            case 'application_update': return <Check className="text-emerald-500" size={16} />;
            case 'drive_post': return <Info className="text-primary-500" size={16} />;
            default: return <AlertCircle className="text-slate-400" size={16} />;
        }
    };

    return (
        <div className="group relative">
            <button className="text-slate-500 hover:text-primary-600 relative p-2 rounded-full hover:bg-slate-50 transition-colors">
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-primary-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>

            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    <button className="text-[10px] font-black uppercase text-primary-600 tracking-widest hover:text-primary-700">Mark all read</button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="p-8 text-center"><Loader2 className="animate-spin inline text-slate-300" /></div>
                    ) : notifications.length > 0 ? (
                        notifications.map(n => (
                            <div
                                key={n._id}
                                onClick={() => !n.read && markRead(n._id)}
                                className={`p-4 border-b last:border-0 hover:bg-slate-50 transition-colors cursor-pointer relative ${!n.read ? 'bg-primary-50/30' : ''}`}
                            >
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm shrink-0 border border-slate-100`}>
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-sm ${!n.read ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{n.title}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                                        <p className="text-[10px] text-slate-400 font-medium pt-1">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                {!n.read && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 rounded-full"></div>}
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-slate-400 space-y-2">
                            <Bell className="mx-auto opacity-20" size={40} />
                            <p className="text-sm">Tailored updates will appear here.</p>
                        </div>
                    )}
                </div>

                {notifications.length > 0 && (
                    <Link to="/notifications" className="block text-center p-3 text-xs font-bold text-slate-500 hover:text-primary-600 border-t bg-slate-50/50">
                        View All Activity
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;
