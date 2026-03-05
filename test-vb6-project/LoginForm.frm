VERSION 5.00
Begin VB.Form frmLogin
   Caption         =   "로그인"
   ClientHeight    =   3120
   ClientLeft      =   60
   ClientTop       =   420
   ClientWidth     =   4680
   LinkTopic       =   "Form1"
   ScaleHeight     =   3120
   ScaleWidth      =   4680
   StartUpPosition =   3  'Windows Default
   Begin VB.TextBox txtPassword
      Height          =   375
      IMEMode         =   3  'DISABLE
      Left            =   1680
      PasswordChar    =   "*"
      TabIndex        =   3
      Top             =   1200
      Width           =   2535
   End
   Begin VB.TextBox txtUserID
      Height          =   375
      Left            =   1680
      TabIndex        =   1
      Top             =   600
      Width           =   2535
   End
   Begin VB.CommandButton btnCancel
      Caption         =   "취소"
      Height          =   495
      Left            =   2760
      TabIndex        =   5
      Top             =   2160
      Width           =   1455
   End
   Begin VB.CommandButton btnLogin
      Caption         =   "로그인"
      Default         =   -1  'True
      Height          =   495
      Left            =   480
      TabIndex        =   4
      Top             =   2160
      Width           =   1455
   End
   Begin VB.Label lblPassword
      Caption         =   "비밀번호:"
      Height          =   375
      Left            =   240
      TabIndex        =   2
      Top             =   1200
      Width           =   1215
   End
   Begin VB.Label lblUserID
      Caption         =   "사용자ID:"
      Height          =   375
      Left            =   240
      TabIndex        =   0
      Top             =   600
      Width           =   1215
   End
End
Attribute VB_Name = "frmLogin"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Form_Load()
    txtUserID.Text = ""
    txtPassword.Text = ""
End Sub

Private Sub btnLogin_Click()
    Dim userService As New UserService
    Dim isValid As Boolean

    isValid = userService.ValidateUser(txtUserID.Text, txtPassword.Text)

    If isValid Then
        MsgBox "로그인 성공!", vbInformation
        frmMain.Show
        Unload Me
    Else
        MsgBox "아이디 또는 비밀번호가 올바르지 않습니다.", vbCritical
        txtPassword.SetFocus
    End If
End Sub

Private Sub btnCancel_Click()
    Unload Me
End Sub
