import Contact from "../models/Contact.js";

/**
 * Create new contact message
 * POST /api/contact
 * Private (any logged-in user)
 */
export const createContact = async (req, res) => {
  try {
    console.log("🚀 Create contact controller is hit!");
    const { name, email, message } = req.body;
    console.log("Req body", req.body);

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    /***---------------------------------------------------------
     * This can also work fine, but a bit elaborate, document can be *modified before calling save() (FOR EXAMPLE: contact.status = "read"; instead of "new") method,and hence flexible
     -----------------------------------------------------------*/
    const contact = new Contact({ user: req.user.id, name, email, message });
    console.log("Contact", contact);
    await contact.save();

    /**-------------------------------------------------------------
     * This adds directly, document is not modifiable before saving
     ---------------------------------------------------------------*/
    // const contact = await Contact.create({
    //   user: req.user.id,
    //   name,
    //   email,
    //   message,
    // });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get logged-in user's messages
 * GET /api/contact/my
 * Private
 */
export const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully!",
      contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all messages (Admin/SuperAdmin)
 * GET /api/contact
 * Private + role
 */
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update contact status (Admin/SuperAdmin only)
 * PATCH /api/contact/:id
 */
export const updateContactStatus = async (req, res) => {
  console.log("🚀 Contact update controller is hit");
  try {
    const { status } = req.body;
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    if (status) contact.status = status;
    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact status updated",
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete contact (Admin/SuperAdmin only)
 * DELETE /api/contact/:id
 */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
