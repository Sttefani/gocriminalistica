import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'Apenas prestadores de serviço podem ver notificacões! '
      });
    }
    const notifications = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(30);

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}
export default new NotificationController();
