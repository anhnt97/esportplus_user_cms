/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dtsgroup.topshare.user.common;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author daua
 */
public class Permission {

    private final Logger logger = AppLogger.getLogger();
    private final List<String> listRole;

    private Permission() {
        listRole = new ArrayList<>();
    }

    private static class PerHolder {

        private static final Permission INSTANCE = new Permission();
    }

    public static synchronized Permission getInstance() {
        return Permission.PerHolder.INSTANCE;
    }

    public void init() {

    }

    public int update() {
        return -1;
    }

    public boolean checkAccessGiftCode(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("ListGiftCode".equals(s) || "NewGiftCode".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessLog(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("checkTransactionServices".equals(s) || "getListMatchesWithBetServices".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessPartner(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("PartnerGold".equals(s)
                    || "PartnerUser".equals(s)
                    || "landing-man".equals(s)
                    || "AddGoldPartnerGold".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessCSKH(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("cskh_paidgreatthan".equals(s)
                    || "cskh_topvip".equals(s)
                    || "cskh_paidgreatthan-man".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessCCU(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("CCUsChart".equals(s) || "CCUAnalysis".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessDoithuong(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("TranferGoldToBalanceList".equals(s)
                    || "AnalyzeAwardService".equals(s)
                    || "ListPayCards".equals(s)
                    || "ManageGiftItemRequestService".equals(s)
                    || "AnalyzeCashoutService".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessNapTien(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return true;
        }
        for (String s : this.listRole) {
            if ("ListRecharge".equals(s)
                    || "ListRechargeRequest".equals(s)
                    || "ListIAPRequest".equals(s)
                    || "RechargeAnalytic".equals(s)
                    || "RechargeWithHourChart".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessFinance(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("FinanceStatistic".equals(s)
                    || "FinanceReport".equals(s)
                    || "GoldFromRecharge".equals(s)
                    || "MoneyRecharge".equals(s)
                    || "SystemGoldHistory".equals(s)
                    || "SystemFee".equals(s)
                    || "MoneyTransactions".equals(s)
                    || "GoldRemainInGame".equals(s)
                    || "getTotalAmountRechargeByDayServices".equals(s)
                    || "TongDoiThuong".equals(s)
                    || "ChiTietPheThuDuoc".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessManager(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("Adminmanagers".equals(s)
                    || "ListOfferGold".equals(s)
                    || "DanhSachThuong".equals(s)
                    || "editNews".equals(s)
                    || "DanhSachScrollDashgame".equals(s)
                    || "ManageGiftItemService".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessHuThuong(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("SetNohugame".equals(s) || "addGoldHuThuong".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessEvent(int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return false;
        }
        for (String s : this.listRole) {
            if ("ConfigHuThuong".equals(s)
                    || "NapTheTheoMoc".equals(s)
                    || "RechargeVipCode".equals(s)
                    || "TopTLMNDemLa".equals(s)
                    || "LoginVipCodeConfig".equals(s)
                    || "LuckyNumber".equals(s)
                    || "DuaTopConfig".equals(s)
                    || "KhuyenMaiNapThe".equals(s)
                    || "LiXiDauXuan".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkAccessUser(int role) {
        if (role == UserRole.SUPER_ADMIN || role == UserRole.PARTNER) {
            return true;
        }

        for (String s : this.listRole) {
            if ("getListPlayerServices".equals(s)
                    || "getListPlayerServices".equals(s)
                    || "GetPaidPlayerList".equals(s)
                    || "rewardGoldServices".equals(s)
                    || "resetPassServices".equals(s)
                    || "InboxServices".equals(s)
                    || "checkInboxPlayerServices".equals(s)
                    || "banNickServices".equals(s)
                    || "banServices".equals(s)
                    || "TopPlayerEarnDaily".equals(s)
                    || "TopPlayerVip".equals(s)
                    || "TopPlayerLevel".equals(s)) {
                return true;
            }
        }
        return false;
    }

    public boolean checkPermission(String url, int role) {
        if (role == UserRole.SUPER_ADMIN) {
            return true;
        }
        if (role == UserRole.PARTNER) {
            return url.equals("getListPlayerServices")
                    || url.equals("DashBoard")
                    || url.equals("SoLieu")
                    || url.equals("Retensions")
                    || url.equals("ListRecharge")
                    || url.equals("playerdetail")
                    || url.equals("LiXiDauXuan")
                    || url.equals("anhtaituhoipage")
                    || url.equals("tangdiemnhiemvupage");

        }
        for (String s : this.listRole) {
            if (url.equals(s)) {
                return true;
            }
        }
        return false;
    }

    public void printRole(String admin) {
        AppLogger.getLogger().info("admin {} size {} ", admin, listRole.size());
        for (String s : this.listRole) {
            AppLogger.getLogger().info(s);
        }
    }

    public void reload() {
        init();
    }

    public void setListRole(String listrole) {
        if (listrole != null && !"".equals(listrole)) {
            String[] str = listrole.split(";");
            this.listRole.clear();
            for (String s : str) {
                if (!"".equals(s) && !"null".equals(s) && s != null) {
                    this.listRole.add(s);
                }
            }
        } else {
            this.listRole.clear();
        }
    }

    public List<String> getListRole() {
        return listRole;
    }

    public void removeListRole() {
        AppLogger.getLogger().info("Remove All Permission !!!");
        this.listRole.clear();
    }

    private class Wrapper {

        String name;
        List<Integer> role;
    }
}
